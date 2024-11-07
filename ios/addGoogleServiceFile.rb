require 'xcodeproj'


project = Xcodeproj::Project.open('EdunionApp.xcodeproj')

target_name = 'EdunionApp'
plist_file_path = 'GoogleService-Info.plist'

group = project.main_group["EdunionApp"]

target = project.targets.find { |t| t.name == target_name }
unless target
  puts "Target #{target_name} not found."
  exit 1
end

# Check if the file already exists in the project
file_ref = group.files.find { |file| file.path == plist_file_path }
unless file_ref
  file_ref = group.new_file(plist_file_path)
  target.add_file_references([file])
else
  target.remove_file_reference(file_ref)
  file_ref = group.new_file(plist_file_path)
  target.add_file_references([file])
end

# Remove file from "Compile Sources" if it’s there
compile_phase = target.source_build_phase
if compile_phase.files_references.include?(file_ref)
  compile_phase.remove_reference(file_ref)
  puts "GoogleService-Info.plist removed from Compile Sources."
end

# Add file to "Copy Bundle Resources" if it’s not already there
copy_resources_phase = target.resources_build_phase
unless copy_resources_phase.files_references.include?(file_ref)
  copy_resources_phase.add_file_reference(file_ref)
end

project.save
puts "GoogleService-Info.plist added to Copy Bundle Resources only."