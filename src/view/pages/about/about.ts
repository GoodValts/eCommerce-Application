import '../../../assets/styles/pages/about.scss';
import logoRSSimg from '../../../assets/images/rs_school.png';
import pinguinsImg from '../../../assets/images/pinguins.png';
import githubImg from '../../../assets/images/githubLogo.png';
import tgImg from '../../../assets/images/telegramLogo.png';
import {
  Ekaterina,
  Ivan,
  Vladzimir,
  teamDescArr,
  projectDescriptionArr,
} from '../../../model/data/team';
import { MemberObj } from '../../../types/type';

const aboutPage = document.createElement('div');

const teamContainer = document.createElement('div');
teamContainer.classList.add('about__team');

const header = document.createElement('h2');
header.classList.add('team__header');
header.textContent = 'Our Team';

const greetingParagraph = document.createElement('p');
greetingParagraph.classList.add('team__greeting');
greetingParagraph.textContent = 'Meet Dev Dream Team — the best RSS team ever!';

teamContainer.append(header, greetingParagraph);

function configureDescription(str: string) {
  const teamDescription = document.createElement('p');
  teamDescription.classList.add('team__description');
  teamDescription.textContent = str;

  teamContainer.append(teamDescription);
}

teamDescArr.forEach((el) => configureDescription(el));

const teamMembersHeader = document.createElement('p');
teamMembersHeader.classList.add('team__header');
teamMembersHeader.textContent = 'Our team members:';

teamContainer.append(teamMembersHeader);

function createMemberBlock(member: MemberObj) {
  const memberBlock = document.createElement('div');
  memberBlock.classList.add('team__member');
  memberBlock.id = member.name;

  const photo = document.createElement('img');
  photo.classList.add('member__img');
  photo.alt = 'Member';
  photo.src = member.photo;

  const name = document.createElement('p');
  name.classList.add('member__name');
  name.textContent = `${member.name} ${member.surname}`;

  const role = document.createElement('p');
  role.classList.add('member__role');
  role.textContent = member.role;

  memberBlock.append(photo, name, role);

  const shortBio = document.createElement('p');
  shortBio.classList.add('member__paragraph');
  shortBio.textContent = `Short bio: ${
    member.name
  } is a ${member.age.toString()} y.o. ${member.skill} from `;

  const shortBioLink = document.createElement('a');
  shortBioLink.classList.add('member__paragraph_link');
  shortBioLink.target = '_blank';
  shortBioLink.href = `https://www.google.by/maps/place/${member.city}`;
  shortBioLink.textContent = member.city;

  shortBio.append(shortBioLink, '.');

  const contribution = document.createElement('p');
  contribution.classList.add('member__paragraph');
  contribution.textContent = `Contribution: ${member.contribution}`;

  function createContactContainer(
    logo: string,
    link: string,
    text: string,
  ): HTMLElement {
    const container = document.createElement('a');
    container.classList.add('member__contact-container');
    container.href = link;

    const logoImg = document.createElement('img');
    logoImg.classList.add('contact__logo');
    logoImg.alt = 'contact_logo';
    logoImg.src = logo;

    const login = document.createElement('p');
    login.classList.add('member__paragraph_login');
    login.textContent = text;

    container.prepend(logoImg, login);

    return container;
  }

  const githubContainer = createContactContainer(
    githubImg,
    `https://github.com/${member.gitHub}`,
    member.gitHub,
  );

  const telegramContainer = createContactContainer(
    tgImg,
    `https://t.me/${member.telegram.slice(1)}`,
    member.telegram,
  );

  memberBlock.append(
    githubContainer,
    telegramContainer,
    shortBio,
    contribution,
  );

  teamContainer.append(memberBlock);
}

createMemberBlock(Vladzimir);
createMemberBlock(Ivan);
createMemberBlock(Ekaterina);

projectDescriptionArr.forEach((el) => configureDescription(el));

const pinguinsLogo = document.createElement('img');
pinguinsLogo.classList.add('team__img');
pinguinsLogo.alt = 'Pinguins';
pinguinsLogo.src = pinguinsImg;

teamContainer.append(pinguinsLogo);

// const easterEggArr = [
//   '    Am           E (E7)              Am',
//   'Что такое Number? Это Object',
//   '  A7                                                      Dm',
//   'Function тоже Object, между прочим',
//   '   Dm                      E (E7)          Am              F',
//   'В Object превращаются Array и TypeError',
//   ' Dm                     E (E7)     Am      Gm    A7',
//   'Object, что же ты со мною сделал..',
//   'ლ(ಠ_ಠ ლ)'
// ];

// easterEggArr.forEach(el => configureDescription(el));

const rssLink = document.createElement('a');
rssLink.classList.add('about__rss-link');
rssLink.href = 'https://rs.school/js/';

const rssLogo = document.createElement('img');
rssLogo.classList.add('about__rss-img');
rssLogo.alt = 'RSS Logo';
rssLogo.src = logoRSSimg;

rssLink.append(rssLogo);

aboutPage.append(teamContainer, rssLink);

export default aboutPage;
