# js-common-classes

## Summary

Repository of common functions written in classes that are used in multiple projects. 

All classes extend the 'common' class in the common.js file. The common.js class provides functions that all js-common-classes use, such as error messages and console loggers. 

## Autodocs Explainer
All classes and files have documentation built-in. Documentation is writen immediately after the class or internal class function declerations. 

Documentation looks like this: 

    // ############################
    // write_to_console - static
    // ---
    // Writes messasge to console log if debug equals true.
    // ---
    // message: string - Message written to console, often the an error message produce by a reject or catch response
    // method: string - Class function that produce the console log message
    // ---
    // Returns: NA
    // ############################

Each line with hash/pound signs designate the start and end of the documentation. Each line with three hyphens designates a new section of the documentation. Documentation can have up to 4 sections, depending on if the documentation is for a constructor, a class that returns no data, or a class that does return data. 

Definition for each section of documentation 'chunks' in order (whether the documentation chunk contains the section or not):
1. Name of the subject for the documentation (e.g., class name, function name, etc.)
2. Summary containing a brief explination for the documentation chunk
3. Definition of the variables passed to the function/thing (in order)
4. Definition of the data being returned by the function/thing. Note that all functions return an object containing a success value, a message, and data. If the documentation chunks states 'NA' in section four, the success value and message are still returned, but data is not. 