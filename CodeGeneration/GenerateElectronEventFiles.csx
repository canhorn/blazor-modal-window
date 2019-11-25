#!dotnet-script
// This script file will generate the event files for use on the client

using System;
using System.Collections.Generic;
using System.IO;

private const string fileToGenerate = "./Electron.FilesToGenerate.txt";
private const string templateForFilePath = "./Templates/electron.events.template";
private const string templateForEventDataPath = "./Templates/electron.events.data.item.template";

// Load in FileToGenerate.txt
var fileToGenerateLines = File.ReadLines(
    fileToGenerate
).Skip(1); // Skip First, it's just header details

foreach (var fileToGenerateLine in fileToGenerateLines)
{
    var splitToken = new[] { " : " };
    var fileToGenerateLineParts = fileToGenerateLine.Split(
        splitToken,
        StringSplitOptions.RemoveEmptyEntries
    );
    var fileToParse = fileToGenerateLineParts.First();
    var locationToPutGeneratedFile = fileToGenerateLineParts.Skip(1).First();
    
    GenerateFileFromFile(
        fileToParse,
        locationToPutGeneratedFile
    );    
}


void GenerateFileFromFile(
    string fileToParse,
    string locationToPutGeneratedFile
)
{
    // Read line by line
    var fileLines = File.ReadLines(
        fileToParse
    );

    var moduleName = "undefined";
    var moduleEventList = new List<string>();
    var moduleEventDataList = new List<TempEventData>();

    var tempEventData = new TempEventData();
    // | START 
    // | MODULE_SET 
    // | EVENT_ITEM_GATHER 
    // | EVENT_ITEM_GATHER_END 
    // | EVENT_DATA_ITEM_NAME_GATHER 
    // | EVENT_DATA_ITEM_NAME_GATHER_END 
    // | EVENT_DATA_ITEM_PROPERTY_GATHER 
    // | EVENT_DATA_ITEM_PROPERTY_GATHER_END
    var processingPhase = "START";
    foreach (var fileLine in fileLines)
    {
        var typeOfLine = GetLineType(
            fileLine
        );
        switch (typeOfLine)
        {
            case "CLASS":
                moduleName = GetModuleNameFromLine(
                    fileLine
                );
                processingPhase = "MODULE_SET";
                break;
            case "EVENT_NAME":
                if (processingPhase == "EVENT_ITEM_GATHER")
                {
                    moduleEventList.Add(
                        GetModuleEventItem(
                            fileLine
                        )
                    );
                }
                break;
            case "EVENT_DATA_NAME":
                if (processingPhase == "EVENT_ITEM_GATHER_END"
                    || processingPhase == "EVENT_DATA_ITEM_PROPERTY_GATHER_END"
                )
                {
                    tempEventData.Name = GetEventDataName(
                        fileLine
                    );
                    processingPhase = "EVENT_DATA_ITEM_NAME_GATHER";
                }
                break;
            case "EVENT_DATA_PROPERTY":
                if (processingPhase == "EVENT_DATA_ITEM_NAME_GATHER_END"
                    || processingPhase == "EVENT_DATA_ITEM_PROPERTY_GATHER"
                )
                {
                    tempEventData.Properties.Add(
                        GetEventDataProperty(
                            fileLine
                        )
                    );
                    processingPhase = "EVENT_DATA_ITEM_PROPERTY_GATHER";
                }
                break;
            case "BRACKET":
                if (processingPhase == "MODULE_SET")
                {
                    processingPhase = "EVENT_ITEM_GATHER";
                }
                else if (processingPhase == "EVENT_ITEM_GATHER")
                {
                    processingPhase = "EVENT_ITEM_GATHER_END";
                }
                else if (processingPhase == "EVENT_DATA_ITEM_NAME_GATHER")
                {
                    processingPhase = "EVENT_DATA_ITEM_NAME_GATHER_END";
                }
                else if (processingPhase == "EVENT_DATA_ITEM_PROPERTY_GATHER")
                {
                    processingPhase = "EVENT_DATA_ITEM_PROPERTY_GATHER_END";
                    moduleEventDataList.Add(
                        tempEventData
                    );
                    tempEventData = new TempEventData();
                }
                break;
            default:
                break;
        }
    }

    var generatedFile = GenerateFile(
        fileToParse,
        locationToPutGeneratedFile,
        moduleName,
        moduleEventList,
        moduleEventDataList
    );

    // Save generated file to Location to Put Generated File
    var locationToPutGeneratedFileInfo = new FileInfo(
        locationToPutGeneratedFile
    );
    locationToPutGeneratedFileInfo.Directory.Create();
    File.WriteAllText(
        locationToPutGeneratedFileInfo.FullName,
        generatedFile
    );
}

string GenerateFile(
    string fileToParse,
    string generatedFileLocation,
    string moduleName,
    IList<string> moduleEventList,
    IList<TempEventData> moduleEventDataList
)
{
    var templateFile = File.ReadAllText(
        templateForFilePath
    );
    return templateFile.Replace(
        "[[GENERATED_FROM_FILE_LOCATION]]",
        fileToParse.Replace("../", "")
    ).Replace(
        "[[GENERATED_TO_FILE_LOCATION]]",
        generatedFileLocation.Replace("../", "")
    ).Replace(
        "[[MODULE_NAME]]",
        moduleName
    ).Replace(
        "[[MODULE_NAME_LOWERCASE]]",
        Char.ToLowerInvariant(moduleName[0]) + moduleName.Substring(1)
    ).Replace(
        "[[EVENT_LIST]]",
        GenerateEventList(
            moduleEventList
        )
    ).Replace(
        "[[EVENT_DATA_LIST]]",
        GenerateEventDataList(
            moduleEventDataList
        )
    );
}

string GenerateEventList(
    IList<string> moduleEventList
)
{
    return string.Join(
        System.Environment.NewLine + "    ",
        moduleEventList
    );
}

string GenerateEventDataList(
    IList<TempEventData> moduleEventDataList
)
{
    var list = moduleEventDataList.Select(
        moduleEventData => CreateEventDataItem(
            moduleEventData
        )
    );
    return string.Join(
        System.Environment.NewLine,
        list
    );
}

string CreateEventDataItem(
    TempEventData eventData
)
{
    return File.ReadAllText(
        templateForEventDataPath
    ).Replace(
        "[[EVENT_DATA_NAME]]",
        eventData.Name
    ).Replace(
        "[[EVENT_DATA_LIST]]",
        CreateEventDataPropertyList(
            eventData.Properties
        )
    );
//     return @"interface I[[EVENT_DATA_NAME]] {
//     [[EVENT_DATA_LIST]]
// }".Replace(
//     "[[EVENT_DATA_NAME]]",
//     eventData.Name
// ).Replace(
//     "[[EVENT_DATA_LIST]]",
//     CreateEventDataPropertyList(
//         eventData.Properties
//     )
// );
}

string CreateEventDataPropertyList(
    IList<string> eventDataProperties
)
{
    return string.Join(
        System.Environment.NewLine + "    ",
        eventDataProperties.Select(
            eventDataProperty =>
                Char.ToLowerInvariant(eventDataProperty[0]) + eventDataProperty.Substring(1)
        )
    );
}

string GetLineType(
    string line
)
{
    if (line.Contains(" class "))
    {
        return "CLASS";
    }
    else if (line.Contains(" struct "))
    {
        return "EVENT_DATA_NAME";
    }
    else if (line.Contains(" { get; set; }"))
    {
        return "EVENT_DATA_PROPERTY";
    }
    else if (line.Contains(" string ") && line.Contains(" = "))
    {
        return "EVENT_NAME";
    }
    else if (line.Contains("{") || line.Contains("}"))
    {
        return "BRACKET";
    }
    return "UNKNOWN";
}

string GetModuleNameFromLine(
    string line
)
{
    var classSplit = new[] { " class " };
    var className = line.Split(
        classSplit,
        StringSplitOptions.RemoveEmptyEntries
    ).Skip(1).First();

    return className.Replace(
        "Events",
        ""
    );
}

string GetModuleEventItem(
    string line
)
{
    var eventNameItemSplit = new[] { " string ", " = " };
    var eventItemParts = line.Split(
        eventNameItemSplit,
        StringSplitOptions.RemoveEmptyEntries
    );

    var eventItemIdentifier = eventItemParts[1];
    var eventItemString = eventItemParts[2]
        .Replace("\"", "'")
        .Replace(";", "");
    return $"{eventItemIdentifier}: {eventItemString},";
}

string GetEventDataName(
    string line
)
{
    var structSplit = new[] { " struct " };
    var structName = line.Split(
        structSplit,
        StringSplitOptions.RemoveEmptyEntries
    ).Skip(1).First();

    return structName;
}

string GetEventDataProperty(
    string line
)
{
    var propertySplit = line.Split(
        new[] { " " },
        StringSplitOptions.RemoveEmptyEntries
    );
    var propertyName = propertySplit.Skip(2).First();
    var propertyType = GetTypeScriptType(
        propertySplit.Skip(1).First()
    );

    return $"{propertyName}: {propertyType}";
}

string GetTypeScriptType(
    string cSharpType
)
{
    switch (cSharpType)
    {
        case "string":
            return "string";
        case "int":
        case "long":
            return "number";
        default:
            return "any";
    }
}

class TempEventData
{
    public string Name { get; set; }
    public IList<string> Properties { get; set; } = new List<string>();
}
