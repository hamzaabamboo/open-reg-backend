import { UserInfo } from './user.model';
import { TitleChoices, TitleEnChoices } from './user.form';

export const parseUserInfo = ({
    title,
    titleEn,
    ...info
}: UserInfo): UserInfo => ({
    ...info,
    title: TitleChoices[+title],
    titleEn: TitleEnChoices[+titleEn],
});
