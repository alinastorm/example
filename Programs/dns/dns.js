const dns = require("dns");
//0 сообщает адрес dns сервера на машине
const servers = dns.getServers();
console.log(servers);

const site = "onliner.by";
//1 ip адрес сайта

dns.resolve(site, (err, data) => {
	if (err) throw err;
	console.log(data);
});

//2 информация о сайте
dns.resolveAny(site, (err, data) => {
	if (err) throw err;
	console.log(data);
});
// 3
const options = {
	all: true,
	family: 4,
	hints: dns.ADDRCONFIG | dns.V4MAPPED,
};
dns.lookup(site, options, (err, addresses) => {
	if (err) throw err;
	console.dir({ addresses });
});
//4
dns.lookupService("8.8.8.8", 80, (err, host, service) => {
	if (err) throw err;
	console.log({ host, service }); //{ host: 'dns.google', service: 'http' }
});
