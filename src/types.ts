export type Role = 'student' | 'teacher' | 'qm';
export type QuestionKind = 'rating' | 'text';
export type Question = { id: string; kind: QuestionKind; text: string; category: string; generated?: boolean };
export type Course = { id: string; code: string; title: string; semester: string; teacher: string; field: string; syllabus: string; start: string; end: string; published: boolean; released: boolean; questions: Question[]; draft: Question[]; locked: boolean };
export type Submission = { id: string; courseId: string; sentAt: string; answers: Record<string, string | number> };
export type RoleUser = { role: Role; name: string; initials: string; id: string };
export type AppData = { courses: Course[]; submissions: Submission[] };
export type PatternFlag = { code: string; label: string; detail: string };
