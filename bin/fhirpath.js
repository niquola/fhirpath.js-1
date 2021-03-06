const fp = require('../src/fhirpath');
const fs = require('fs');

// this cli util is part of public interface of fhirpath
// it can be extended with understading urls and files
// TODO: introduce subcommands to inspect, eval fhirpath etc

if (process.argv.length < 4) {

  console.log("path and file parameters are required");
  console.log("Usage:  fhirpath 'Patient.name.given' path/to/resource.json");

} else {

  let path =  process.argv[2];
  let resource = JSON.parse(fs.readFileSync(process.argv[3]));
  let res = fp.evaluate(resource, path);

  console.log('fhirpath(' + path + ') =>');
  console.log(JSON.stringify(res, null, " "));
  
}

