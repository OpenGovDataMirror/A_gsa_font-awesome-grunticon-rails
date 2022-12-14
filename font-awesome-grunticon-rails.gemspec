# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'font/awesome/grunticon/rails/version'

Gem::Specification.new do |spec|
  spec.name          = "font-awesome-grunticon-rails"
  spec.version       = Font::Awesome::Grunticon::Rails::VERSION
  spec.date          = '2015-07-28'
  spec.authors       = ["Nick Marden"]
  spec.email         = ["nick@rrsoft.co"]

  spec.summary       = %q{Compile a specified set of Font Awesome icons into a Grunticon-based SVG/CSS+PNG graceful degradation cascade}
  spec.homepage      = 'https://github.com/gsa/font-awesome-grunticon-rails'
  spec.license       = 'MIT'

  spec.files         = Dir["{lib,vendor}/**/*"] + ["README.md"]
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.8"
  spec.add_development_dependency "rake", "~> 10.0"

  spec.add_dependency "railties", "~> 3.2"
end
