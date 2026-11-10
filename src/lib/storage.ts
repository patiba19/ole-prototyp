import {initialData} from './seed';
import type {AppData} from '../types';
const APP='ole-poc-data-v1';
const PARTICIPATION='ole-poc-participation-v1';
export function loadData():AppData {try{const saved=localStorage.getItem(APP);if(saved){const parsed=JSON.parse(saved) as AppData;if(Array.isArray(parsed.courses)&&Array.isArray(parsed.submissions))return parsed}}catch{}return initialData()}
export function saveData(data:AppData){localStorage.setItem(APP,JSON.stringify(data))}
/** Separate Berechtigungsmarkierungen: nicht in Submission-Objekten gespeichert. */
export function hasParticipated(userId:string,courseId:string){try{return Boolean((JSON.parse(localStorage.getItem(PARTICIPATION)||'{}') as Record<string,boolean>)[`${userId}:${courseId}`])}catch{return false}}
export function markParticipated(userId:string,courseId:string){let map:Record<string,boolean>={};try{map=JSON.parse(localStorage.getItem(PARTICIPATION)||'{}')}catch{}map[`${userId}:${courseId}`]=true;localStorage.setItem(PARTICIPATION,JSON.stringify(map))}
export function resetDemo(){localStorage.removeItem(APP);localStorage.removeItem(PARTICIPATION)}
export function withinWindow(start:string,end:string){const now=new Date();const today=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;return today>=start&&today<=end}
export const dateDE=(iso:string)=>new Date(`${iso.slice(0,10)}T12:00:00`).toLocaleDateString('de-AT',{day:'2-digit',month:'short',year:'numeric'});
