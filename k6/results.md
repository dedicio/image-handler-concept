     execution: local
        script: script.js
        output: json (results.json)

     scenarios: (100.00%) 3 scenarios, 60 max VUs, 1m35s max duration (incl. graceful stop):
              * bun: Up to 20 looping VUs for 1m5s over 3 stages (gracefulRampDown: 30s, exec: bun, gracefulStop: 30s)
              * express: Up to 20 looping VUs for 1m5s over 3 stages (gracefulRampDown: 30s, exec: express, gracefulStop: 30s)
              * fastify: Up to 20 looping VUs for 1m5s over 3 stages (gracefulRampDown: 30s, exec: fastify, gracefulStop: 30s)


     ✓ is status 200

     bun_duration...................: avg=4067.839059 min=2328.528369 med=3958.905871 max=6649.741973 p(90)=5038.600237 p(95)=5169.237974
     express_duration...............: avg=3422.237732 min=1308.172978 med=3323.139903 max=7345.990001 p(90)=4830.70245  p(95)=5291.365369
     fastify_duration...............: avg=3003.420207 min=1199.472619 med=2904.258399 max=5664.069498 p(90)=4302.361273 p(95)=4876.050369
     checks.........................: 100.00% ✓ 89       ✗ 0   
     data_received..................: 47 kB   495 B/s
     data_sent......................: 146 MB  1.5 MB/s
     http_req_blocked...............: avg=113.49ms    min=225.13µs    med=119.24ms    max=225.67ms    p(90)=185.75ms    p(95)=203.77ms   
     http_req_connecting............: avg=110.09ms    min=150.45µs    med=117.54ms    max=225.58ms    p(90)=181.46ms    p(95)=202.01ms   
   ✗ http_req_duration..............: avg=3.49s       min=1.19s       med=3.65s       max=7.34s       p(90)=4.9s        p(95)=5.18s      
       { expected_response:true }...: avg=3.49s       min=1.19s       med=3.65s       max=7.34s       p(90)=4.9s        p(95)=5.18s      
   ✓ http_req_failed................: 0.00%   ✓ 0        ✗ 89  
     http_req_receiving.............: avg=16.62ms     min=58.84µs     med=105.59µs    max=528.04ms    p(90)=3.63ms      p(95)=85.47ms    
     http_req_sending...............: avg=45.31ms     min=670.55µs    med=40.94ms     max=439.7ms     p(90)=82.7ms      p(95)=102.28ms   
     http_req_tls_handshaking.......: avg=0s          min=0s          med=0s          max=0s          p(90)=0s          p(95)=0s         
     http_req_waiting...............: avg=3.42s       min=1.19s       med=3.54s       max=7.32s       p(90)=4.86s       p(95)=5.15s      
     http_reqs......................: 89      0.936832/s
     iteration_duration.............: avg=39.51s      min=5.14s       med=42.97s      max=59.08s      p(90)=54.12s      p(95)=55.73s     
     iterations.....................: 89      0.936832/s
     vus............................: 2       min=2      max=60
     vus_max........................: 60      min=60     max=60


running (1m35.0s), 00/60 VUs, 89 complete and 34 interrupted iterations
bun     ✓ [======================================] 01/20 VUs  1m5s
express ✓ [======================================] 00/20 VUs  1m5s
fastify ✓ [======================================] 01/20 VUs  1m5s
ERRO[0098] thresholds on metrics 'http_req_duration' have been crossed 


####



     execution: local
        script: script.js
        output: -

     scenarios: (100.00%) 3 scenarios, 90 max VUs, 9m30s max duration (incl. graceful stop):
              * bun: Up to 3.33 iterations/s for 9m0s over 4 stages (maxVUs: 30, exec: bun, gracefulStop: 30s)
              * express: Up to 3.33 iterations/s for 9m0s over 4 stages (maxVUs: 30, exec: express, gracefulStop: 30s)
              * fastify: Up to 3.33 iterations/s for 9m0s over 4 stages (maxVUs: 30, exec: fastify, gracefulStop: 30s)

WARN[0021] Insufficient VUs, reached 30 active VUs and cannot initialize more  executor=ramping-arrival-rate scenario=fastify
WARN[0021] Insufficient VUs, reached 30 active VUs and cannot initialize more  executor=ramping-arrival-rate scenario=bun
WARN[0021] Insufficient VUs, reached 30 active VUs and cannot initialize more  executor=ramping-arrival-rate scenario=express

     ✓ is status 200

     bun_duration...................: avg=5627.652088 min=2803.825849 med=5579.898565 max=8802.144364 p(90)=7283.132737 p(95)=7823.997814
     express_duration...............: avg=4612.611606 min=1643.10028  med=4443.042332 max=7700.167002 p(90)=6406.649221 p(95)=6916.668323
     fastify_duration...............: avg=4688.173634 min=1801.578416 med=4443.401823 max=9660.871456 p(90)=6664.914654 p(95)=7006.23619 
     checks.........................: 100.00% ✓ 319      ✗ 0   
     data_received..................: 169 kB  288 B/s
     data_sent......................: 442 MB  757 kB/s
     dropped_iterations.............: 3903    6.678549/s
     http_req_blocked...............: avg=264.75ms    min=306.26µs    med=256.01ms    max=871.49ms    p(90)=420.7ms     p(95)=513.76ms   
     http_req_connecting............: avg=248.44ms    min=188.63µs    med=248.07ms    max=871.32ms    p(90)=376.38ms    p(95)=434.34ms   
   ✗ http_req_duration..............: avg=4.97s       min=1.64s       med=4.74s       max=9.66s       p(90)=6.88s       p(95)=7.41s      
       { expected_response:true }...: avg=4.97s       min=1.64s       med=4.74s       max=9.66s       p(90)=6.88s       p(95)=7.41s      
   ✓ http_req_failed................: 0.00%   ✓ 0        ✗ 319 
     http_req_receiving.............: avg=25.97ms     min=53.03µs     med=167.9µs     max=1.58s       p(90)=10.72ms     p(95)=77.69ms    
     http_req_sending...............: avg=120.05ms    min=626.25µs    med=79.08ms     max=1.2s        p(90)=319.07ms    p(95)=390.55ms   
     http_req_tls_handshaking.......: avg=0s          min=0s          med=0s          max=0s          p(90)=0s          p(95)=0s         
     http_req_waiting...............: avg=4.82s       min=1.58s       med=4.67s       max=9.59s       p(90)=6.72s       p(95)=7.24s      
     http_reqs......................: 319     0.545851/s
     iteration_duration.............: avg=2m16s       min=4.71s       med=2m33s       max=3m1s        p(90)=2m48s       p(95)=2m52s      
     iterations.....................: 319     0.545851/s
     vus............................: 7       min=3      max=90
     vus_max........................: 90      min=90     max=90


running (9m44.4s), 00/90 VUs, 319 complete and 67 interrupted iterations
bun     ✓ [======================================] 22/30 VUs  9m0s  0.52 iters/s
express ✓ [======================================] 22/30 VUs  9m0s  0.52 iters/s
fastify ✓ [======================================] 23/30 VUs  9m0s  0.52 iters/s
ERRO[0588] thresholds on metrics 'http_req_duration' have been crossed 



####


execution: local
        script: script.js
        output: -

     scenarios: (100.00%) 3 scenarios, 90 max VUs, 9m30s max duration (incl. graceful stop):
              * bun: Up to 1.67 iterations/s for 9m0s over 4 stages (maxVUs: 30, exec: bun, gracefulStop: 30s)
              * express: Up to 1.67 iterations/s for 9m0s over 4 stages (maxVUs: 30, exec: express, gracefulStop: 30s)
              * fastify: Up to 1.67 iterations/s for 9m0s over 4 stages (maxVUs: 30, exec: fastify, gracefulStop: 30s)

WARN[0099] Insufficient VUs, reached 30 active VUs and cannot initialize more  executor=ramping-arrival-rate scenario=express
WARN[0100] Insufficient VUs, reached 30 active VUs and cannot initialize more  executor=ramping-arrival-rate scenario=bun
WARN[0100] Insufficient VUs, reached 30 active VUs and cannot initialize more  executor=ramping-arrival-rate scenario=fastify

     ✓ is status 200

     bun_duration...................: avg=4602.062356 min=1997.953332 med=4500.856707 max=7848.912686 p(90)=5962.327873 p(95)=6376.926598
     express_duration...............: avg=3558.850879 min=882.210906  med=3462.236518 max=6506.798545 p(90)=4977.013025 p(95)=5403.457258
     fastify_duration...............: avg=3497.592413 min=867.897589  med=3351.911605 max=6946.763896 p(90)=4753.691566 p(95)=4983.529626
     checks.........................: 100.00% ✓ 505      ✗ 0   
     data_received..................: 267 kB  463 B/s
     data_sent......................: 703 MB  1.2 MB/s
     dropped_iterations.............: 1487    2.578575/s
     http_req_blocked...............: avg=208.93ms    min=159.66µs    med=201.6ms     max=907.36ms    p(90)=353.45ms    p(95)=403.19ms   
     http_req_connecting............: avg=198.82ms    min=107.13µs    med=192.53ms    max=636.1ms     p(90)=336.94ms    p(95)=385.6ms    
   ✗ http_req_duration..............: avg=3.87s       min=867.89ms    med=3.7s        max=7.84s       p(90)=5.34s       p(95)=5.83s      
       { expected_response:true }...: avg=3.87s       min=867.89ms    med=3.7s        max=7.84s       p(90)=5.34s       p(95)=5.83s      
   ✓ http_req_failed................: 0.00%   ✓ 0        ✗ 505 
     http_req_receiving.............: avg=26.84ms     min=53.64µs     med=116.1µs     max=1.6s        p(90)=8.16ms      p(95)=137.35ms   
     http_req_sending...............: avg=86.33ms     min=515.71µs    med=54.43ms     max=2.26s       p(90)=155.38ms    p(95)=268.6ms    
     http_req_tls_handshaking.......: avg=0s          min=0s          med=0s          max=0s          p(90)=0s          p(95)=0s         
     http_req_waiting...............: avg=3.76s       min=867.11ms    med=3.63s       max=7.8s        p(90)=5.18s       p(95)=5.63s      
     http_reqs......................: 505     0.87571/s
     iteration_duration.............: avg=1m23s       min=2.43s       med=1m35s       max=1m55s       p(90)=1m44s       p(95)=1m46s      
     iterations.....................: 505     0.87571/s
     vus............................: 11      min=0      max=90
     vus_max........................: 90      min=90     max=90


running (9m36.7s), 00/90 VUs, 505 complete and 45 interrupted iterations
bun     ✓ [======================================] 20/30 VUs  9m0s  0.35 iters/s
express ✓ [======================================] 12/30 VUs  9m0s  0.35 iters/s
fastify ✓ [======================================] 13/30 VUs  9m0s  0.35 iters/s
ERRO[0582] thresholds on metrics 'http_req_duration' have been crossed 



####


execution: local
        script: script.js
        output: -

     scenarios: (100.00%) 3 scenarios, 90 max VUs, 9m30s max duration (incl. graceful stop):
              * bun: Up to 1.67 iterations/s for 9m0s over 4 stages (maxVUs: 30, exec: bun, gracefulStop: 30s)
              * express: Up to 1.67 iterations/s for 9m0s over 4 stages (maxVUs: 30, exec: express, gracefulStop: 30s)
              * fastify: Up to 1.67 iterations/s for 9m0s over 4 stages (maxVUs: 30, exec: fastify, gracefulStop: 30s)

WARN[0114] Insufficient VUs, reached 30 active VUs and cannot initialize more  executor=ramping-arrival-rate scenario=express
WARN[0114] Insufficient VUs, reached 30 active VUs and cannot initialize more  executor=ramping-arrival-rate scenario=fastify
WARN[0115] Insufficient VUs, reached 30 active VUs and cannot initialize more  executor=ramping-arrival-rate scenario=bun

     ✓ is status 200

     bun_duration...................: avg=6750.853968 min=1881.287428 med=5911.76062  max=16121.72405  p(90)=11192.884696 p(95)=12939.956982
     express_duration...............: avg=5940.508764 min=796.874073  med=5142.115836 max=17865.745979 p(90)=11136.099294 p(95)=12476.451459
     fastify_duration...............: avg=6176.672134 min=849.584584  med=5680.725385 max=19388.065194 p(90)=10909.415849 p(95)=12990.27231 
     checks.........................: 100.00% ✓ 542      ✗ 0   
     data_received..................: 287 kB  498 B/s
     data_sent......................: 771 MB  1.3 MB/s
     dropped_iterations.............: 1440    2.497388/s
     http_req_blocked...............: avg=174.15ms    min=146.31µs    med=178.38ms    max=979.64ms     p(90)=316.48ms     p(95)=355.56ms    
     http_req_connecting............: avg=166.34ms    min=96.59µs     med=172.11ms    max=650.22ms     p(90)=294.91ms     p(95)=339.42ms    
   ✗ http_req_duration..............: avg=6.28s       min=796.87ms    med=5.59s       max=19.38s       p(90)=11.13s       p(95)=13s         
       { expected_response:true }...: avg=6.28s       min=796.87ms    med=5.59s       max=19.38s       p(90)=11.13s       p(95)=13s         
   ✓ http_req_failed................: 0.00%   ✓ 0        ✗ 542 
     http_req_receiving.............: avg=26.12ms     min=60.35µs     med=105.08µs    max=871.25ms     p(90)=4.02ms       p(95)=149.59ms    
     http_req_sending...............: avg=74.59ms     min=390.82µs    med=45.56ms     max=988.28ms     p(90)=150.02ms     p(95)=209.77ms    
     http_req_tls_handshaking.......: avg=0s          min=0s          med=0s          max=0s           p(90)=0s           p(95)=0s          
     http_req_waiting...............: avg=6.18s       min=796.15ms    med=5.45s       max=19.28s       p(90)=11.09s       p(95)=12.88s      
     http_reqs......................: 542     0.939989/s
     iteration_duration.............: avg=1m13s       min=2.32s       med=1m27s       max=1m57s        p(90)=1m39s        p(95)=1m44s       
     iterations.....................: 542     0.939989/s
     vus............................: 7       min=0      max=90
     vus_max........................: 90      min=90     max=90


running (9m36.6s), 00/90 VUs, 542 complete and 57 interrupted iterations
bun     ✓ [======================================] 20/30 VUs  9m0s  0.35 iters/s
express ✓ [======================================] 21/30 VUs  9m0s  0.35 iters/s
fastify ✓ [======================================] 16/30 VUs  9m0s  0.35 iters/s
ERRO[0585] thresholds on metrics 'http_req_duration' have been crossed 



