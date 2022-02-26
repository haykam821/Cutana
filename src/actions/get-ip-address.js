const Action = require("../types/actions/action.js");

const externalIP = require("ipify");
const systemInfo = require("systeminformation");

class GetIPAddressAction extends Action {
	async getDefaultInterface() {
		const defaultInterface = await systemInfo.networkInterfaceDefault();
		const interfaces = await systemInfo.networkInterfaces();

		return interfaces.find(networkInterface => {
			return networkInterface.iface === defaultInterface;
		});
	}

	async getLocalIP(ipv6 = false) {
		const networkInterface = await this.getDefaultInterface();
		return ipv6 ? networkInterface.ip6 : networkInterface.ip4;
	}

	getExternalIP(ipv6 = false) {
		return ipv6 ? externalIP() : externalIP({
			useIPv6: false,
		});
	}

	run() {
		const ipv6 = this.parameters.iPAddressTypeOption === "IPv6";

		if (this.parameters.iPAddressSourceOption === "External") {
			return this.getExternalIP(ipv6);
		} else {
			return this.getLocalIP(ipv6);
		}
	}
}
GetIPAddressAction.identifier = "is.workflow.actions.getipaddress";

module.exports = GetIPAddressAction;
