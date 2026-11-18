// UI status strings only. Scientific translation is a separately reviewed PRESENTATION asset.
import type {SupportedLocale} from '../runtime/presentation.ts';
const messages={
 'en-US':{pending:'Academic review pending.',unavailable:'Reviewed content unavailable.',saveBlocked:'Save not verified; feedback locked.'},
 'hi-IN':{pending:'शैक्षणिक समीक्षा लंबित है।',unavailable:'समीक्षित सामग्री उपलब्ध नहीं है।',saveBlocked:'सहेजने की पुष्टि नहीं हुई; प्रतिक्रिया बंद है।'}
} as const;
export type UIState=keyof typeof messages['en-US'];
export function getUIStateMessage(key:UIState,locale:SupportedLocale='en-US'):string{
 if(!Object.hasOwn(messages,locale)||!Object.hasOwn(messages[locale],key))throw Error('TRANSLATION_UNAVAILABLE');
 return messages[locale][key];
}
