# Angular-Httpclient-Converttime
A Simple Angular Application that consumes a REST API (https://github.com/tyronnelazaro/spring-boot-api-serverdate) to fetch the input data of Server Date in epoch. The epoch time is passed to another REST API (https://timezonedb.com/references/convert-time-zone) to convert to Asia/Singapore timezone.


## To Deploy
File Jenkinsfile-aws is a jenkinsfile configuration used by Jenkins pipeline to automatically perform the following stages:

- Build the angular application which creates the application directory at dist/angular-httpclient-converttime
```bash
ng build --prod
```  
- Upload the package to S3 bucket
```bash
aws s3 sync dist/angular-httpclient-converttime s3://angular-httpclient-serverdate --region us-east-2
```


## To Test
To test if the application is working, visit the AWS S3 Endpoint in your chosen browser:
![Angular Application Screenshot](https://github.com/tyronnelazaro/angular-httpclient-converttime/blob/main/angular-application-screenshot.png)

# The Pre-requisites
- Node.js
- Angular
- Angular-CLI
- AWS Cli


# The Solution

# The Solution
## Imports
1. In src/app/app.module.ts, import HttpClientModule so we can fetch data from REST API.
  - import { HttpClientModule } from '@angular/common/http';
  - add the module in '@NgModule' imports as well.

## Service
2. Create a service for the REST API (ng g service restapi) located at src/app/restapi.service.ts
  - I define the two REST API endpoints as constant
		- const endpoint = `https://gqhvylstke.execute-api.us-east-2.amazonaws.com/Prod/serverdate`;
		- const timezonedb = `http://api.timezonedb.com/v2.1/convert-time-zone?key=TSWVHT8C4CJK&format=json&from=UTC&to=Asia/Singapore&time=`;
  - getServertime() calls a get method to the endpoint
  - getConvertedtime() calls a get method to the timezonedb with dependency on the value of 'epoch'. Epoch is in number data type that will come from the result of getServertime call, which in turn saves the value in interface Convertedtime.


## Component
3. Create a component to access all REST API service call that use HttpClient from the module. (ng g component time)
  - at ngOnInit, getServertime's results will subscribe to Convertedtime interface
  - getConvertedtime's dependency on epoch will get its value from timeconvert.epoch
  - getConvertedtime's result will subscribe to timeconverted placeholder.

## Component HTML
4. To display the source server time and converted time:
  - Source Server time: We converted the Source API epoch time from seconds to milliseconds (multiply by 1000) and formatted the date to UTC (timezone of the source api server).
```json
{{timeconvert.epoch * 1000 | date:'medium':'+0000'}}
```
  - Converted Time: Same as the source server time; convert to milliseconds and format the date to UTC.
  - Since TimezoneDB API already converted our source server time to UTC+8, we need to offset the conversion and set the timezone to UTC to avoid converting the output time to user's locale.
```json
{{timeconverted.toTimestamp * 1000 | date:'medium':'+0000'}}
```

## Routing
5. Since the application will be uploaded to S3, which /paths are not applicable. We ensure that the routing is at the root URL.
  - In src/app/app-routing.module.ts, set the route as follows:
```json
  {
    path: '',
    component: TimeComponent,
    data: { title: 'Server Time Details' }
  }
```
