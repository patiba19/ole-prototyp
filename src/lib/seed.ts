import type {AppData, Course, Question, Submission, RoleUser} from '../types';
export const USERS: Record<string,RoleUser> = {
 student: {role:'student',name:'Alex Berger',initials:'AB',id:'demo-student-1'},
 teacher: {role:'teacher',name:'Dr. Lena Hofer',initials:'LH',id:'demo-teacher-1'},
 qm: {role:'qm',name:'Miriam Gruber',initials:'MG',id:'demo-qm-1'},
};
const delta=(days:number)=>{const d=new Date();d.setDate(d.getDate()+days);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
const q=(id:string,kind:Question['kind'],text:string,category:string):Question=>({id,kind,text,category});
export const initialData=():AppData=>{
 const courses:Course[]=[
 {id:'ux',code:'UXD-301',title:'User Experience Design',semester:'WS 2026/27',teacher:'Dr. Lena Hofer',field:'Design & Technologie',syllabus:'Lernziele: User Research, Personas, Journey Mapping, barrierefreie Interfaces, Wireframing und Usability-Tests. Prüfungsleistung: Teamprojekt mit Prototyp und Präsentation. Methoden: Workshops, Peer Feedback, Praxisübungen und iterative Design-Sprints.',start:delta(-12),end:delta(18),published:true,released:true,locked:false,draft:[],questions:[q('ux1','rating','Wie hilfreich waren die Praxisübungen beim Erstellen von Wireframes?','Praxisbezug'),q('ux2','rating','Wie gut wurden Methoden des User Research vermittelt?','Lernziele'),q('ux3','rating','Wie nachvollziehbar war das Feedback zu den Design-Sprints?','Feedback'),q('ux4','rating','Wie verständlich waren die Inhalte zur Barrierefreiheit?','Inhalte'),q('ux5','text','Welche Änderung würde die Usability-Tests in dieser Lehrveranstaltung verbessern?','Verbesserung')]},
 {id:'data',code:'DAT-204',title:'Data Analytics & Visualization',semester:'WS 2026/27',teacher:'Prof. Markus Leitner',field:'Wirtschaft & Informatik',syllabus:'Lernziele: Datenbereinigung, explorative Datenanalyse, statistische Grundlagen, Python, Datenvisualisierung und kritische Interpretation. Methoden: Live Coding, Fallstudien und Laborübungen. Beurteilung: Datenprojekt und schriftliche Reflexion.',start:delta(-7),end:delta(24),published:true,released:false,locked:false,draft:[],questions:[q('da1','rating','Wie gut haben die Live-Coding-Einheiten das Verständnis von Python gefördert?','Methoden'),q('da2','rating','Wie praxisnah waren die Fallstudien zur Datenbereinigung?','Praxisbezug'),q('da3','rating','Wie klar wurden statistische Konzepte erklärt?','Lernziele'),q('da4','rating','Wie hilfreich war das Feedback zum Datenprojekt?','Feedback'),q('da5','text','Welche Inhalte zur Datenvisualisierung sollten vertieft werden?','Verbesserung')]},
 {id:'pm',code:'PM-110',title:'Agiles Projektmanagement',semester:'WS 2026/27',teacher:'Dr. Lena Hofer',field:'Management',syllabus:'Lernziele: Scrum, Kanban, Sprintplanung, Stakeholderkommunikation, Risikomanagement. Lehrform: Gruppenarbeiten, Retrospektiven und Simulationen. Prüfung: Projektbericht.',start:delta(5),end:delta(34),published:false,released:false,locked:false,draft:[],questions:[q('pm1','rating','Wie hilfreich waren die Scrum-Simulationen für Ihr Verständnis agiler Methoden?','Praxisbezug'),q('pm2','text','Was würden Sie an der Sprintplanung verbessern?','Verbesserung')]}
 ];
 
courses.push({
  id: 'requirements-engineering',
  code: 'RE-101',
  title: 'Requirements Engineering',
  semester: 'WS 2026/27',
  teacher: 'Dr. Lena Hofer',
  field: 'Informatik & Management',

  syllabus: `
Lernziel:
Erlernen von Kenntnissen und Anwenderkompetenz
im Requirements Engineering (RE).

Lehrveranstaltungsinhalte:
- Rolle des Requirements Engineering in der
  Produkt- und Prozessentwicklung verstehen
- Grundbegriffe des Requirements Engineering kennen
- Phasen des Requirements Engineering verstehen
- Ermittlungstechniken für Anforderungen kennen
- Einsatz von KI im Requirements Engineering
- Natürlichsprachliche und modellbasierte
  Dokumentation von Anforderungen durchführen
- Methoden zur Prüfung und Bewertung
  von Anforderungen anwenden
  `,

  start: delta(-7),
  end: delta(21),

  published: true,
  released: false,
  locked: false,
  draft: [],

  questions: [
    q(
      're1',
      'rating',
      'Wie verständlich wurde die Rolle des Requirements Engineering in der Produkt- und Prozessentwicklung vermittelt?',
      'Grundlagen'
    ),
    q(
      're2',
      'rating',
      'Wie gut konnten Sie die verschiedenen Phasen des Requirements Engineering nachvollziehen?',
      'Lernziele'
    ),
    q(
      're3',
      'rating',
      'Wie hilfreich waren die vermittelten Techniken zur Ermittlung von Anforderungen?',
      'Anforderungsermittlung'
    ),
    q(
      're4',
      'rating',
      'Wie praxisnah wurde der Einsatz von KI im Requirements Engineering behandelt?',
      'KI-Einsatz'
    ),
    q(
      're5',
      'rating',
      'Wie gut wurden die natürlichsprachliche und modellbasierte Dokumentation von Anforderungen vermittelt?',
      'Dokumentation'
    ),
    q(
      're6',
      'rating',
      'Wie gut wurden Sie darauf vorbereitet, Anforderungen systematisch zu prüfen und zu bewerten?',
      'Anforderungsqualität'
    ),
    q(
      're7',
      'text',
      'Welche Inhalte oder praktischen Übungen im Requirements Engineering sollten verbessert oder vertieft werden?',
      'Verbesserung'
    )
  ]
});

 const submissions:Submission[]=[];
 const samples=[
  [5,4,5,4,'Die gemeinsamen Usability-Tests waren besonders hilfreich.'],[4,4,4,5,'Mehr Zeit für die abschließende Präsentation.'],[5,5,4,5,'Sehr gute Verbindung von Theorie und Praxis.'],[3,4,3,4,'Zusätzliche Beispiele zur Barrierefreiheit wären sinnvoll.'],[4,5,4,4,'Die Feedbackrunden waren sehr wertvoll.'],[5,5,5,5,'Alles gut.'],[2,3,3,3,'Mehr individuelle Betreuung während der Workshops.'],[4,4,5,4,'Die Methoden waren anschaulich erklärt.'],[1,1,1,1,'ok'],[5,4,4,5,'Mehr Zeit für User Research.'],[4,5,5,4,'Gute Übungen!'],[3,4,4,3,'Mehr Beispiele aus Unternehmen.']
 ] as (number|string)[][];
 samples.forEach((sample,i)=>{const answers:Submission['answers']={};courses[0].questions.forEach((item,j)=>answers[item.id]=sample[j]);submissions.push({id:`demo-ux-${i+1}`,courseId:'ux',sentAt:new Date(Date.now()-(i+1)*86400000).toISOString(),answers})});
 const ds=[[4,5,4,4,'Mehr Visualisierungsbeispiele.'],[3,4,4,3,'Laborzeit erhöhen.'],[5,5,4,5,'Live Coding war gut.'],[4,4,3,4,'Wiederholung von Statistik.'],[5,5,5,5,'Super Veranstaltung.'],[2,3,2,3,'Bessere Erklärung von Python-Fehlern.']];
 ds.forEach((sample,i)=>{const answers:Submission['answers']={};courses[1].questions.forEach((item,j)=>answers[item.id]=sample[j]);submissions.push({id:`demo-data-${i+1}`,courseId:'data',sentAt:new Date(Date.now()-(i+1)*86400000).toISOString(),answers})});
 return {courses,submissions};
};
