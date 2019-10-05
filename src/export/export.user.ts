const uKey = (key: string) => `user.info.${key}`;

export const userInfoKeys = [
    {
        label: 'คำนำหน้าชื่อ (ภาษาไทย)',
        value: uKey('title'),
    },
    {
        label: 'ชื่อ (ภาษาไทย)',
        value: uKey('firstName'),
    },
    {
        label: 'นามสกุล (ภาษาไทย)',
        value: uKey('lastName'),
    },
    {
        label: 'คำนำหน้าชื่อ (ภาษาอังกฤษ)',
        value: uKey('titleEn'),
    },
    {
        label: 'ชื่อ (ภาษาอังกฤษ)',
        value: uKey('firstNameEn'),
    },
    {
        label: 'นามสกุล (ภาษาอังกฤษ)',
        value: uKey('lastNameEn'),
    },
    {
        label: 'ชื่อเล่น (ภาษาไทย)',
        value: uKey('nickName'),
    },
    {
        label: 'ชื่อเล่น (ภาษาอังกฤษ)',
        value: uKey('nickNameEn'),
    },
    {
        label: 'รหัสนิสิต',
        value: uKey('chulaId'),
    },
    {
        label: 'ชั้นปี',
        value: uKey('year'),
    },
    {
        label: 'คณะ',
        value: uKey('faculty'),
    },
    {
        label: 'เบอร์โทรศัพท์',
        value: uKey('tel'),
    },
    {
        label: 'เบอร์ติดต่อฉุกเฉิน',
        value: uKey('emergencyTel'),
    },
    {
        label: 'มีความเกี่ยวข้องเป็น',
        value: uKey('emergencyRelationship'),
    },
    {
        label: 'E-mail',
        value: uKey('email'),
    },
    {
        label: 'Line',
        value: uKey('line'),
    },
    {
        label: 'Facebook',
        value: uKey('facebook'),
    },
];
