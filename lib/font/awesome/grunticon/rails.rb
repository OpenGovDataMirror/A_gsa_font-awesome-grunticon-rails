require "font/awesome/grunticon/rails/version"

module Font
  module Awesome
    module Grunticon
      module Rails
        class Engine < ::Rails::Engine
          initializer "font-awesome-grunticon-rails.assets.precompile" do |app|
            {
              'javascripts' => '*.js',
              'stylesheets' => '*.css',
              'images' => '*.png',
              'images/png' => '*.png'
            }.each do |dir, glob|
              fulldir = ::File.expand_path("../../../../../vendor/assets/#{dir}", __FILE__)
              # puts "Checking #{fulldir} for #{glob}"
              ::Dir.glob("#{fulldir}/#{glob}").map do |f|
                relative_path = f.sub("#{fulldir}/", '')
                relative_path = "png/#{relative_path}" if dir == 'images/png'
                # puts "Adding #{relative_path} to app.config.assets.precompile"
                app.config.assets.precompile += [ relative_path ]
              end
            end
          end
        end
      end
    end
  end
end
