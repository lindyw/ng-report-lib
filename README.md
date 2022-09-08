# NgOctReport

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.0.

HTML:
<ng-oct-report></ng-oct-report>

TS:
NgOctReportService

- createHeader(this.header);
  createTopAlerts(this.topAlerts);
  createTopBaselines(this.topBaselines);
  createBaselines(this.baselines);

Release package CMDs:
1. npm run build
2. npm run pack OR npm pack --pack-destination C:\workspace\angular-libs\build (for local test)

Publish:
3. npm publish ng-oct-report-{{version}}.tgz

Detailed breakdown CMDs:
1. ng-packagr -p projects/ng-oct-report/ng-package.json
2. cd dist/ng-oct-report
3. npm pack <-- important to run npm pack cmd before and publish the tgz file instead of dist file (avoid missing imported modules on npmjs)
4. npm publish ng-oct-report-{{version}}.tgz


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
