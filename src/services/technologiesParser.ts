const technologies = [
  ['HTML'],
  ['CSS'],
  ['React', 'ReactJS', 'React.JS'], ['Angular'], ['Vue', 'VueJS'],
  ['JavaScript', 'JS'],
  ['TypeScript'],

  ['Python'],
  ['NodeJS', 'Node.JS'], ['Express'], ['Deno'],
  ['Java'],
  ['PHP'],
  ['C++'],
  ['C#'],
  ['.NET', 'NET'],
  ['C'],
  ['Golang', 'GO'],
  ['Scala'],
  ['Perl'],
  ['Shell'],
  ['Haskell'],
  ['Rust'],
  ['Ruby on Rails', 'Ruby'],
  ['Lua'],

  ['Swift'],
  ['Kotlin'],
  ['Flutter'],
  ['Dart'],
  ['React Native'],

  ['MySQL'], ['SQL'],
  ['PostgresSQL'],
  ['Mongo', 'MongoDB'],
  ['Redis'],

  ['AWS', 'Amazon Web Services'],

  ['Linux'],
  ['MATLAB'],
  ['R'],

  ['Search Engine Optimization', 'SEO']
];

export const parseTechnologies = (
  jobDescription: string
)  => {
  const _technologies: string[] = [];

  const _jobDescription: string = jobDescription.toLowerCase();

  for (let i = 0; i < technologies.length; i++) {
    for (let j = 0; j < technologies[i].length; j++) {
      if (
        new RegExp('\\b' + technologies[i][j].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '\\b', 'i').test(_jobDescription)
        && !_technologies.includes(technologies[i][j].toLowerCase())
      ) {
        _technologies.push(technologies[i][j]);
        break;
      }
    }
  }

  return _technologies;
};