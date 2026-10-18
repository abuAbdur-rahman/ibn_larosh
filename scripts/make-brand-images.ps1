# Generates the app icon set + OG image from the supplied brand originals.
# Source assets are never modified; output goes to src/app/ and public/.
Add-Type -AssemblyName System.Drawing

$root = "D:\Self\ibn_larosh"
$emblem = Join-Path $root "public\brand\emblem.png"
$logo = Join-Path $root "public\brand\logo.png"

function Save-Resized {
  param($source, $target, $width, $height, $background)

  $img = [System.Drawing.Image]::FromFile($source)
  $bmp = New-Object System.Drawing.Bitmap($width, $height)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.Clear($background)

  # Contain: preserve aspect ratio inside the square.
  $scale = [Math]::Min($width / $img.Width, $height / $img.Height)
  $w = [int]($img.Width * $scale)
  $h = [int]($img.Height * $scale)
  $x = [int](($width - $w) / 2)
  $y = [int](($height - $h) / 2)
  $g.DrawImage($img, $x, $y, $w, $h)

  $bmp.Save($target, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose(); $img.Dispose()
  Write-Output ("wrote " + $target + " (" + $width + "x" + $height + ")")
}

Save-Resized -source $emblem -target (Join-Path $root "src\app\icon.png") -width 256 -height 256 -background ([System.Drawing.ColorTranslator]::FromHtml("#FAF4E1"))
Save-Resized -source $emblem -target (Join-Path $root "src\app\apple-icon.png") -width 180 -height 180 -background ([System.Drawing.ColorTranslator]::FromHtml("#FAF4E1"))

# 1200x630 Open Graph card: cream canvas, brand logo centred, gold hairline.
$bmp = New-Object System.Drawing.Bitmap(1200, 630)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.Clear([System.Drawing.ColorTranslator]::FromHtml("#FAF4E1"))

$gold = New-Object System.Drawing.Pen([System.Drawing.ColorTranslator]::FromHtml("#C9962F"), 6)
$g.DrawRectangle($gold, 30, 30, 1140, 570)

$img = [System.Drawing.Image]::FromFile($logo)
$scale = [Math]::Min(980 / $img.Width, 470 / $img.Height)
$w = [int]($img.Width * $scale); $h = [int]($img.Height * $scale)
$g.DrawImage($img, [int]((1200 - $w) / 2), [int]((630 - $h) / 2), $w, $h)

$bmp.Save((Join-Path $root "public\og.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose(); $img.Dispose()
Write-Output "wrote public\og.png (1200x630)"
