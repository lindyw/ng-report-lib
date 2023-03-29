# Oct-report-lib

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.0.


HTML:
<ng-oct-report></ng-oct-report>

TS:
NgOctReportService

- createHeader(this.header);
- createTopAlerts(this.topAlerts);
- createTopBaselines(this.topBaselines);
- allCategories(this.categories);

Publish package (NEW):
- RUN `ng-publish-to-git` or `npm run deploy` after you committed & pushed your library to gitlab

How to install and use it on your project?
add this to your package.json `"oct-report-lib": "git+ssh://git@gitlab.com/octiga/oct-report-lib.git#[tag version]"`
RUN `npm i oct-report-lib`


Troubleshooting:

1. Some image/assets are missing on the report?
- try to copy node_modules/ng-oct-report/assets/* to your assets folder in your application level
  e.g. `"COPY -R node_modules/ng-oct-report/assets/* src/app/assets/"`

2. style is missing on the report?
- go to `angular.json`, add "src/assets/core.scss" under projects.[your project name].architect.build.options.styles

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test ng-oct-report` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
