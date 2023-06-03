/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags);

WA.ui.actionBar.addButton(descriptor: {
    id: string,
    label: string,
    clickCallback: (buttonActionBar: AddButtonActionBar) => void
}): void

const myLayerSubscriber = WA.room.onEnterLayer("CosaiFrame").subscribe(() => {
  WA.chat.sendChatMessage("Hello!", "Mr Robot");
});

WA.room.onLeaveLayer("myLayer").subscribe(() => {
  WA.chat.sendChatMessage("Goodbye!", "Mr Robot");
  myLayerSubscriber.unsubscribe();
});


// Action zone "visit"
	WA.room.area.onEnter('Arena').subscribe(() => {
		WA.ui.modal.openModal({
			title: "Nxlvl Arena",
			src: 'https://cosa.nxlvl.fr',
			allowApi: true,
			allow: "fullscreen",
			position: "center"
		});	
	});

// Add action bar button 'CLOUD'.
	WA.ui.actionBar.addButton({
		id: 'cloud-btn',
		label: 'CLOUD',
		callback: (event) => {
			console.log('Button clicked', event);
			WA.ui.modal.openModal({
				title: "Cloud by Holidée",
				src: 'https://cloud.holidee.fr',
				allowApi: true,
				allow: "fullscreen",
				position: "center"
			});	
		}
	});

    WA.room.area.onEnter('clock').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
    })

    WA.room.area.onLeave('clock').subscribe(closePopup)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
