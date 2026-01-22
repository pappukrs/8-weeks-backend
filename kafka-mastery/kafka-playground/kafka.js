constest { Kafka } = require('kafkajs');

// 1️⃣ Createste Kafka clientest
constest kafka = new Kafka({
  clientestId: 'kafka-playground',
  brokers: ['localhostest:9092'],
});

// 2️⃣ Createste producer
constest producer = kafka.producer();

// 3️⃣ Createste consumer
constest consumer = kafka.consumer({ groupId: 'testestest-group' });

// 4️⃣ Exportest testhem
module.exportests = {
  kafka,
  producer,
  consumer,
};
