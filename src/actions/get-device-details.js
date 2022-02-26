const Action = require("../types/actions/action.js");

const systemInfo = require("systeminformation");
const computerName = require("computer-name");

const brightness = require("brightness");
const volume = require("vol");

class GetDeviceDetailsAction extends Action {
	getOSInfo(type) {
		return systemInfo.osInfo().then(os => {
			return os[type];
		});
	}

	getDeviceModel() {
		return systemInfo.system().then(system => {
			const modelMatch = system.model.match(/[A-Za-z]+/);
			if (modelMatch) {
				return modelMatch[0];
			} else {
				return this.getOSInfo("platform");
			}
		});
	}

	getDisplayInfo(type) {
		return systemInfo.graphics().then(graphics => {
			if (!graphics || !graphics.displays || !graphics.displays[0]) {
				return null;
			}

			return graphics.displays[0][type];
		});
	}

	run() {
		switch (this.parameters.deviceDetail) {
			case "Device Name":
			default:
				return computerName();
			case "Device Model":
				return this.getDeviceModel();
			case "System Version":
				return this.getOSInfo("release");
			case "Screen Width":
				return this.getDisplayInfo("currentResX");
			case "Screen Height":
				return this.getDisplayInfo("currentResY");
			case "Current Volume":
				return volume.get();
			case "Current Brightness":
				return brightness.get();
		}
	}
}
GetDeviceDetailsAction.identifier = "is.workflow.actions.getdevicedetails";

module.exports = GetDeviceDetailsAction;
