import ivanImg from '../../assets/images/photo-ivan.jpg';
import kateImg from '../../assets/images/photo-kate.jpg';
import vovaImg from '../../assets/images/photo-vova.jpg';

function getAge(date: Date): number {
  const currentDate = new Date();

  let years = currentDate.getFullYear() - date.getFullYear();

  if (
    currentDate.getMonth() < date.getMonth() ||
    (currentDate.getMonth() === date.getMonth() &&
      currentDate.getDate() < date.getDate())
  )
    years -= 1;

  return years;
}

const Ivan = {
  name: 'Ivan',
  surname: 'Martynjuk',
  age: getAge(new Date(1994, 11, 14, 0, 0, 0, 0)),
  photo: ivanImg,
  city: 'Gomel',
  role: 'Team Lead',
  skill: 'Front-end Developer',
  contribution:
    'Ivan, as the team lead, managed the team, ensuring effective collaboration and coordination of work. His proactive management methods ensured the successful implementation of the assignment. Additionally, Ivan played a pivotal role in designing and developing the interface structures, bringing a visually appealing and user-friendly view to the application.',
  gitHub: 'GoodValts',
  telegram: '@szczuczynszczyna',
};

const Ekaterina = {
  name: 'Katsiaryna',
  surname: 'Talkachova',
  age: getAge(new Date(1986, 2, 21)),
  photo: kateImg,
  city: 'Brest',
  role: 'Web Developer',
  skill: 'Front-end Developer',
  contribution:
    "Katya is a clever and detail-oriented developer who played a crucial role in the project's development. Her responsibilities included event handler development, form creation, backend request processing, and test writing. With her expertise, she consistently delivered high-quality code and made significant contributions to the project's success. Additionally, Katya actively collaborated with team members, ensuring effective communication and coordination throughout the entire project.",
  gitHub: 'Katrin-brest',
  telegram: '@katrin_awsm',
};

const Vladzimir = {
  name: 'Vladimir',
  surname: 'Myazin',
  age: getAge(new Date(1986, 10, 28, 0, 0, 0, 0)),
  photo: vovaImg,
  city: 'Ulyanovsk',
  role: 'Web Components Developer',
  skill: 'Front-end Developer',
  contribution:
    'Vladimir made a significant contribution to the development of the application by designing and implementing key functionalities, including routing, repository creation, structure organization, and project configuration. His knowledge and experience played a decisive role in achieving successful results. Additionally, he actively collaborated with other team members, ensuring effective communication and synchronization of work.',
  gitHub: 'Greys73',
  telegram: '@greys73',
};

const teamDescArr = [
  'We are a group of talented and creative developers who are passionate about crafting exceptional software solutions. We take pride in our ability to think outside the box and bring fresh perspectives to every project we undertake. Our goal is not just to meet your expectations, but to surpass them.',
  'Our team consists of unique developers who specialize in creating captivating user interfaces and seamless user experiences. With diverse backgrounds and skillsets that cover everything from mobile to web, our team is equipped to tackle any project with confidence. We thrive on challenges and eagerly embrace new and exciting ventures.',
  'Trust us with your projects, and we will ensure they are executed with precision and excellence!',
];

const projectDescriptionArr = [
  'Together, we formed a cohesive and dynamic team, driven by a shared dedication to exceeding expectations and turning aspirations into reality. Our goal was not just to complete a task based on acceptance criteria and achieve the highest score, but to create an exceptional web application that surpasses expectations. Fueled by our unwavering love for motorcycles and driven by our unwavering commitment, we approached the process of selecting a theme with unbridled inspiration.',
  'We understand that each user brings their own unique set of requirements and preferences, including the devices they use to access our platform and their specific goals and expectations. We strove to deliver a comprehensive and user-friendly experience for users of diverse backgrounds, experiences, and preferences, and this commitment is evident in every aspect of our work. Where necessary, we were not afraid to deviate slightly from strict adherence to specifications in order to create something even better. We poured our hearts and souls into this project, to demonstrate not only that we can, but to showcase how we can develop applications.',
  'We were excited to collaborate with one another and prove that the Dev Dream Team is the best RSS team.',
];

export { Ivan, Ekaterina, Vladzimir, teamDescArr, projectDescriptionArr };
