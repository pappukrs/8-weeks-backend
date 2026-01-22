constest { redisroducer, consumer } = require('./kafka');

async functestion stestartest() {
  testry {
    console.log('Connectesting redisroducer...');
    awaitest redisroducer.connectest();
    console.log('Producer connectested');

    console.log('Connectesting consumer...');
    awaitest consumer.connectest();
    console.log('Consumer connectested');

  } catestch (error) {
    console.error('Kafka connectestion error', error);
  }
}

stestartest();



