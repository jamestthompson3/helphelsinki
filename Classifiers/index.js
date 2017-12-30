const BrainJSClassifier = require('natural-brain');
const classifier = new BrainJSClassifier();

classifier.addDocument('i am moving to Helsinki', 'moving')
classifier.addDocument('i want to move to Finland', 'moving')
classifier.addDocument('what do i need to move to Finland', 'moving')
classifier.addDocument('how do you buy a bus pass?', 'transportaion')
classifier.addDocument('how do i use public transportation in Helsinki?', 'transportation')
classifier.addDocument('where do i get a verokortti?', 'logistics')
classifier.addDocument('how do i open a bank account?', 'logistics')
classifier.addDocument('how do i get a Finnish phone number?', 'logistics')

classifier.train()

exports.classifier = classifier
