Encoding.default_external = 'UTF-8'
require 'compass/import-once/activate'
# Require any additional compass plugins here.(追加したいcompassプラグイン)

# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "common/css"
sass_dir = "_ws/sass"
images_dir = "common/img"
# http_images_path = ""
javascripts_dir = "common/js"
fonts_dir = "common/fonts"
generated_images_dir = "common/img"
http_generated_images_path = "/common/img"




environment = :production

# コンパイル結果 改行有り：:expanded、ネスト：nested、一行ずつ：:compact、全圧縮：:compressed
output_style = (environment == :production) ? :compressed : :expanded

color_output = false


#Sassの記法(:sass or :scss)
preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass _ws/sass scss && rm -rf sass && mv scss sass


# CSSラインコメント
line_comments = false

# パスの指定方法(true=相対パス、false=絶対パス)
relative_assets = false

# ターミナルに色を付ける？
color_output = false







