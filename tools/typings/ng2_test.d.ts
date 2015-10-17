// Very bad one but fix compiler complaints.
declare module ng {
  var DOM: any;
  let AsyncTestCompleter;
}

declare module "angular2/src/core/dom/dom_adapter" {
  export = ng;
}

declare module "angular2/testing_internal" {
  export = ng;
}
