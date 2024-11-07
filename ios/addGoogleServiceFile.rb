require 'xcodeproj'

project = Xcodeproj::Project.open('EdunionApp.xcodeproj')

target_name = "EdunionApp"
file_path = "GoogleService-Info.plist"

group = project.main_group["EdunionApp"]

file_ref = group.files.find { |file| file.path == file_path }
if file_ref
    file_ref.remove_from_project
    puts "File found thus removed from project"
end

file = group.new_file(file_path)

target = project.targets.find { |t| t.name == target_name }
if not target
    puts "Target #{target_name} not found"
    exit 1
end
target.resources_build_phase.add_file_reference(file)

project.save
puts "#{file_path} added to the project"