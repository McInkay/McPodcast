const NodeID3 = require("node-id3");
const msToTime = require("../src/utils").msToTime;

const timestampFormat = "HH:MM:SS";

const timeToMS = (time) => {
	if (time === timestampFormat) {
		return undefined;
	}

	const [h, m, s] = time.split(":");

	return (parseInt(h) * 60 * 60 + parseInt(m) * 60 + parseInt(s)) * 1000;
};

exports.getTags = (file) => {
	const tags = NodeID3.read(file);
	delete tags.raw;

	if (tags.length) {
		tags.length = msToTime(tags.length);
	}
	return tags;
};

exports.setTags = (file, tags) => {
	if (tags.length && tags.length.includes(":")) {
		tags.length = timeToMS(tags.length);
	}
	const success = NodeID3.write(tags, file);
	return success;
};
