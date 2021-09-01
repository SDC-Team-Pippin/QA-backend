# Product/Overview Backend
## About the project
Developed and scaled an existing e-commerce back-end to handle web scale traffic. The emphasis of this project was on deployment and optimization for perfomance at scale.
- Utilized PostgreSQL native functions to restructure responses at the multi-threaded database level to increase response times for complex queries
- Deployed a cluster of three Node.js/Express servers and an NGINX proxy server/load balancer to double throughput under load for all API endpoints 
- Developed and horizontally scaled  back-end from 100 clients/second under load to 4500 clients/second with potential to further horizontally scale to handle greater web-scale traffic

### Database Schema
![postgres-schema-design](https://user-images.githubusercontent.com/50717360/131751166-a77f0c7c-2b5d-45ce-9fff-4258589cb1e2.png)
<!-- <img src="https://user-images.githubusercontent.com/50717360/131751166-a77f0c7c-2b5d-45ce-9fff-4258589cb1e2.png" width="500" height="500"> -->

### Built With
- Node.js
- PostgreSQL
- AWS
- NGINX
