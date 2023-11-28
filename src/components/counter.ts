export default class Counter {
    chapter = 0;
    section = 0;
    subsection = 0;
    newChapter() {
        this.chapter += 1;
        this.section = 0;
        this.subsection = 0;
        return `${this.chapter}`;
    }
    newSection() {
        this.section += 1;
        this.subsection = 0;
        return `${this.chapter}.${this.section}`;
    }
    newSubsection() {
        this.subsection += 1;
        return `${this.chapter}.${this.section}.${this.subsection}`;
    }
    setChapter(to: number) {
        this.chapter = to;
    }
    setSection(to: number) {
        this.section = to;
    }
    setSubsection(to: number) {
        this.subsection = to;
    }
}