import type {Question, Submission, QuestionKind, PatternFlag} from '../types';
const uid=()=>globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
const dictionary:{keys:string[],kind:QuestionKind,category:string,text:string}[]=[
 {keys:['usability','wireframe','design','interface'],kind:'rating',category:'Praxisbezug',text:'Wie hilfreich waren die praktischen Design- und Usability-Übungen für Ihren Lernerfolg?'},
 {keys:['barrierefrei','accessibility'],kind:'rating',category:'Lernziele',text:'Wie verständlich wurden die Prinzipien barrierefreier Gestaltung vermittelt?'},
 {keys:['python','coding','programmier'],kind:'rating',category:'Methoden',text:'Wie gut haben die praktischen Coding-Einheiten Ihr Verständnis gefördert?'},
 {keys:['daten','statistik','visualisier'],kind:'rating',category:'Lernziele',text:'Wie klar wurden die Methoden zur Analyse und Interpretation von Daten erläutert?'},
 {keys:['scrum','kanban','sprint','agil'],kind:'rating',category:'Praxisbezug',text:'Wie hilfreich waren die Simulationen für Ihr Verständnis agiler Arbeitsmethoden?'},
 {keys:['gruppen','team','projekt'],kind:'rating',category:'Zusammenarbeit',text:'Wie gut haben die Gruppen- und Projektarbeiten zur Erreichung der Lernziele beigetragen?'},
 {keys:['feedback','reflexion','retrospekt'],kind:'rating',category:'Feedback',text:'Wie hilfreich war das Feedback für die Weiterentwicklung Ihrer Arbeit?'},
 {keys:['fallstud','praxis','workshop','labor'],kind:'rating',category:'Methoden',text:'Wie passend waren die Praxisbeispiele und Übungen zu den Lernzielen?'},
 {keys:['prüfung','beurteilung','präsentation'],kind:'rating',category:'Transparenz',text:'Wie transparent wurden Anforderungen und Beurteilungskriterien kommuniziert?'},
 ];
export interface AIService {generateQuestions(syllabus:string,courseTitle:string):Promise<Question[]>; detectPatterns(submission:Submission,questions:Question[]):PatternFlag[]}
/** Austauschbarer lokaler KI-Adapter; keine Daten werden an externe Dienste gesendet. */
export const mockAI:AIService={
 async generateQuestions(syllabus,courseTitle){
  const s=(syllabus+' '+courseTitle).toLocaleLowerCase('de');
  const matching=dictionary.filter(x=>x.keys.some(k=>s.includes(k))).slice(0,4);
  const base=matching.length?matching:dictionary.filter(x=>['Lernziele','Feedback','Methoden'].includes(x.category)).slice(0,3);
  const result=base.map(x=>({id:uid(),kind:x.kind,category:x.category,text:x.text,generated:true}));
  result.push({id:uid(),kind:'rating',category:'Gesamtbewertung',text:'Wie gut hat die Lehrveranstaltung die im Syllabus beschriebenen Lernziele erreicht?',generated:true});
  result.push({id:uid(),kind:'text',category:'Verbesserung',text:`Welche konkreten Verbesserungen wünschen Sie sich für „${courseTitle}“?`,generated:true});
  return Promise.resolve(result);
 },
 detectPatterns(submission,questions){
  const rated=questions.filter(q=>q.kind==='rating').map(q=>Number(submission.answers[q.id])).filter(n=>Number.isFinite(n)&&n>=1&&n<=5);
  const texts=questions.filter(q=>q.kind==='text').map(q=>String(submission.answers[q.id]??'').trim());
  const flags:PatternFlag[]=[];
  if(rated.length>=3&&rated.every(x=>x===rated[0]))flags.push({code:'straightline',label:'Identische Skalenwerte',detail:'Alle Bewertungen sind gleich. Das kann auch eine bewusst einheitliche Einschätzung sein.'});
  if(texts.length && texts.every(t=>t.length<12))flags.push({code:'shorttext',label:'Sehr kurze Freitextantwort',detail:'Kurzer Freitext. Möglicherweise bewusst knapp; bitte im Kontext prüfen.'});
  return flags;
 }
};
