require 'xcodeproj'

project_path = 'ProjectDir/EdunionApp.xcodeproj'

project = Xcodeproj::Project.open(project_path)

group = project.main_group["EdunionApp"]["EdunionApp"]

file = group.new_file("GoogleService-Info.plist")

main_target = project.targets.first
main_target.add_file_references([file])

project.save