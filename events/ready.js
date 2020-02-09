module.exports = async bot => {
	console.log(`Hi, ${bot.user.username} is now online!`);

	let activities = [`try !download`, `share your score!`],
		i = 0;
	setInterval(() => bot.user.setActivity(`${bot.prefix}help | ${activities[i++ % activities.length]}`, { type: 3 }), 15000);
};