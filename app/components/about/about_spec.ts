import {
  TestComponentBuilder,
  describe,
  expect,
  inject,
  beforeEachProviders,
  it
} from 'angular2/testing';
import {AsyncTestCompleter} from 'angular2/testing_internal';
import {Component, View, bind} from 'angular2/angular2';
import {DOM} from 'angular2/src/core/dom/dom_adapter';
import {AboutCmp} from './about';
import {NameList} from '../../services/name_list';

// workaround this issue: https://github.com/angular/angular/issues/4715
// about_spec.js is executed first so Provider is available to all other test files.
beforeEachProviders(() => [bind(AsyncTestCompleter).toValue(new AsyncTestCompleter())]);

export function main() {
  describe('About component', () => {
    it('should work',
      inject([TestComponentBuilder, AsyncTestCompleter], (tcb: TestComponentBuilder, async) => {
        tcb.overrideTemplate(TestComponent, '<div><about></about></div>')
          .createAsync(TestComponent)
          .then((rootTC) => {
            rootTC.detectChanges();

            let aboutInstance = rootTC.debugElement.componentViewChildren[0].componentInstance;
            let aboutDOMEl = rootTC.debugElement.componentViewChildren[0].nativeElement;
            let nameListLen = function () {
              return aboutInstance.list.names.length;
            };

            expect(aboutInstance.list).toEqual(jasmine.any(NameList));
            expect(nameListLen()).toEqual(4);
            expect(DOM.querySelectorAll(aboutDOMEl, 'li').length).toEqual(nameListLen());

            aboutInstance.addName({value: 'Minko'});
            rootTC.detectChanges();

            expect(nameListLen()).toEqual(5);
            expect(DOM.querySelectorAll(aboutDOMEl, 'li').length).toEqual(nameListLen());

            expect(DOM.querySelectorAll(aboutDOMEl, 'li')[4].textContent).toEqual('Minko');

            async.done();
          });
      }));
  });
}

@Component({bindings: [NameList], selector: 'test-cmp'})
@View({directives: [AboutCmp]})
class TestComponent {}
