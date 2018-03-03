const view = require('think-view');
const model = require('think-model');
const cache = require('think-cache');
const mongoose = require('think-mongoose');
const session = require('think-session');
const mongo = require('think-mongo');

module.exports = [
	mongoose(think.app),
	view, // make application support view
	model(think.app),
	cache,
	session
];
