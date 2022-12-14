# Rails::Font::Awesome::Grunticon

This is a hand-rolled gem to convert Font Awesome font icons into CSS stylesheets that employ SVG, or failing that, PNG, to display Font Awesome across a wide range of browsers without the need for webfont support.

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'font-awesome-grunticon-rails'
```

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install font-awesome-grunticon-rails

## Usage

First, you will need to load the generic stylesheet that defines Font Awesome classes:

```
@import 'font-awesome-grunticon-rails/fa-generic.css';
```

Then, in your templating language of choice (HAML is shown here), create an `<i>` object with the `fa` class as well as the class of the icon you want:

```
  %li
    = link_to new_site_path do
      %i.fa.fa-plus
      Add Site
```

If you would like to use SVG effects, make sure to add the `data-grunticon-embed` attribute (with any value):

```
  %li
    = link_to new_site_path do
      %i.fa.fa-plus-inactive{'data-grunticon-embed' => 'toggle_me'}
      Add Site
```

You must then import the provided loader code (`font-awesome-grunticon-rails/loader.js`) and invoke its loader in your JS:

```
//= require font-awesome-grunticon-rails/loader

grunticon([
  "/assets/font-awesome-grunticon-rails/icons.data.svg.css",
  "/assets/font-awesome-grunticon-rails/icons.data.png.css",
  "/assets/font-awesome-grunticon-rails/fallback.css",
  grunticon.svgLoadedCallback
);
```

## Development

To rebuild the `font-awesome-grunticon-rails` stylesheets and Javascript, do the following:

* Fork this repo
* `npm install`
* Edit icons.list to contain the list of icons you would like to use
* Change the Gruntfile.js to set whichever colors you would like to compile
* `grunt`
* Add the modified stylesheets and JS to your branch
* Add your forked `font-awesome-grunticon-rails` gem (GitHub URL + SHA ref) to your project's Gemfile like this:

```
  gem 'font-awesome-grunticon-rails', git: 'git://github.com/yourname/font-awesome-grunticon-rails', ref: 'YOUR_SHA_HERE'
```

## Contributing

1. Fork it ( https://github.com/gsa/font-awesome-grunticon-rails/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
