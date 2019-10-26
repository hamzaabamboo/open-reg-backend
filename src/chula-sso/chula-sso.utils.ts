export const FACULTY = {
    engineering: 'Faculty of Engineering',
    arts: 'Faculty of Arts',
    science: 'Faculty of Science',
    economics: 'Faculty of Economics',
    politicalsci: 'Faculty of Political Science',
    architecture: 'Faculty of Architecture',
    commerce: 'Faculty of Commerce and Accountancy',
    education: 'Faculty of Education',
    commart: 'Faculty of Communication Arts',
    medicine: 'Faculty of Medicine',
    veterinarysci: 'Faculty of Veterinary Science',
    dentistry: 'Faculty of Dentistry',
    pharmaceuticalsci: 'Faculty of Pharmaceutical Sciences',
    law: 'Faculty of Law',
    finearts: 'Faculty of Fine and Applied Arts',
    nurse: 'Faculty of Nursing',
    psychology: 'Faculty of Psychology',
    alliedhealthsci: 'Faculty of Allied Health Sciences',
    sportsci: 'Faculty of Sports Science',
    sar: 'School of Agricultural Resources',
    bascii: 'School Of Integrated Innovation (BAScii)',
};

export class StudentInfo {
    chulaId: string;
    year: number;
    faculty: string;
}

const faculties = {
    [21]: FACULTY.engineering,
    [22]: FACULTY.arts,
    [23]: FACULTY.science,
    [24]: FACULTY.politicalsci,
    [25]: FACULTY.architecture,
    [26]: FACULTY.commerce,
    [27]: FACULTY.education,
    [28]: FACULTY.commart,
    [29]: FACULTY.economics,
    [30]: FACULTY.medicine,
    [31]: FACULTY.veterinarysci,
    [32]: FACULTY.dentistry,
    [33]: FACULTY.pharmaceuticalsci,
    [34]: FACULTY.law,
    [35]: FACULTY.finearts,
    [36]: FACULTY.nurse,
    [37]: FACULTY.alliedhealthsci,
    [38]: FACULTY.psychology,
    [39]: FACULTY.sportsci,
    [40]: FACULTY.sar,
    [56]: FACULTY.bascii,
};

export function parseStudentId(chulaId: string): StudentInfo | null {
    const pattern = /^(\d{2})(\d{1})(\d{5})(\d{2})$/;
    const match = chulaId.match(pattern);
    if (!match) return null;
    const yearBC =
        (((new Date().getMonth() > 5
            ? new Date().getFullYear()
            : new Date().getFullYear() - 1) +
            543) %
            100) +
        1;
    const year = yearBC - parseInt(match[1]);
    if (year < 1) return null;
    const faculty = faculties[match[4]] || 'Unknown';
    return {
        chulaId,
        year,
        faculty,
    };
}
