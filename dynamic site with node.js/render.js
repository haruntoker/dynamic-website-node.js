
// 4. function that handles the reading of files and merge in value.
  //read from file and get a string
    //merge values in to string
    const fs = require('fs');

    function mergeValues(values, content) {
      // Cycle over the keys
      for (let key in values) {
        // Replace all {{key}} with the values from the values object
        values.avatarUrl === values["avatarUrl"]
        content = content.replace(`{{${key}}}`, values[key]);
      }
      // Return merged content
      return content;
    }
    
     function view(templateName, values, response) {
      
        // Read the file synchronously with UTF-8 encoding
        let fileContents = fs.readFileSync(`./views/${templateName}.html`, { encoding: 'utf8' });
    
        // Merge values into the template
        fileContents = mergeValues(values, fileContents);
        
    
        // Write the merged content to the response
        response.write(fileContents);

      } 
    
    
    module.exports.view = view;
    
    


  