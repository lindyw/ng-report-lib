# Oct-report-lib

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.0.

HTML:
<ng-oct-report></ng-oct-report>

TS:
NgOctReportService

- createHeader(this.header);
  createTopAlerts(this.topAlerts);
  createTopBaselines(this.topBaselines);
  allCategories(this.categories);

Publish package (NEW):
- RUN `ng-publish-to-git` after you committed & pushed your library to gitlab

How to install and use it on your project?
add this to your package.json `"oct-report-lib": "git+ssh://git@gitlab.com/octiga/oct-report-lib.git#[tag version]"`
RUN `npm i oct-report-lib`

Troubleshooting:

1. Some image/assets are missing on the report?
- try to copy node_modules/ng-oct-report/assets/* to your assets folder in your application level
  e.g. `"COPY -R node_modules/ng-oct-report/assets/* src/app/assets/"`

2. style is missing on the report?
- go to `angular.json`, add "src/assets/core.scss" under projects.[your project name].architect.build.options.styles

## Code scaffolding

Run `ng generate component component-name --project ng-oct-report` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project ng-oct-report`.
> Note: Don't forget to add `--project ng-oct-report` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build ng-oct-report` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ng-oct-report`, go to the dist folder `cd dist/ng-oct-report` and run `npm publish`.

## Running unit tests

Run `ng test ng-oct-report` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
