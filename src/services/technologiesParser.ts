const technologies = [
  'HTML',
  'CSS',
  'React', 'Angular', 'Vue', 'VueJS',
  'JavaScript', 'JS',
  'TypeScript',

  'Python',
  'NodeJS', 'Express', 'Deno',
  'Java',
  'PHP',
  'C++',
  'C#',
  'C',
  'Golang', 'GO',
  'Scala',
  'Perl',
  'Shell',
  'Haskell',
  'Rust',
  'Ruby on Rails', 'Ruby',
  'Lua',

  'Swift',
  'Kotlin',
  'Flutter',
  'Dart',

  'MySQL', 'SQL',
  'Mongo', 'MongoDB',
  'Redis',

  'Linux',
  'MATLAB',
  'R',

  'Search Engine Optimization', 'SEO'
];

export const parseTechnologies = (
  content: string
)  => {
  const _technologies: string[] = [];

  const _content: string = content.toLowerCase();

  for (let i = 0; i < technologies.length; i++) {
    if (_content.includes(technologies[i].toLowerCase()) && !_technologies.includes(technologies[i])) {
      _technologies.push(technologies[i]);
    }
  }

  return _technologies;
};