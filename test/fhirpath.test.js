const subj = require('../src/fhirpath');
const yaml = require('js-yaml');
const fs   = require('fs');

// Get document, or throw exception on error
// const testcase = yaml.safeLoad(fs.readFileSync( __dirname + '/cases/simple.yaml', 'utf8'));

var items = fs.readdirSync(__dirname + '/cases/');

for (var i=0; i<items.length; i++) {
  var fileName = items[i];

  const testcase = yaml.safeLoad(fs.readFileSync( __dirname + '/cases/' + fileName, 'utf8'));

  describe(fileName, ()=> {
    testcase.tests.forEach((t)=>{
      // console.log(yaml.dump(subj.parse(t.expression)));
      let exprs = Array.isArray(t.expression) ? t.expression : [t.expression];
      exprs.forEach((e)=>{
        it(((t.desc || '') + ': ' + e) , () => {
          var res = subj.evaluate(testcase.subject, e);
          expect(res).toEqual(t.result);
        });
      });
    });

  });
}

