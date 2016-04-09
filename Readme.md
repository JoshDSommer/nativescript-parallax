#NativeScript Parallax View Plugin.



[![NativeScript Parallax Scroll Effect. Click to Play](https://img.youtube.com/vi/sR_Ku7dsm2c/0.jpg)](https://www.youtube.com/embed/sR_Ku7dsm2c)
>Please note fading in and fading out controls as in the above video is not yet completed

###Install
`$ tns plugin add nativescript-parallax`

###Example xml useage

```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd"
	 xmlns:parallax="nativescript-parallax"
	loaded="pageLoaded">
  <StackLayout>
  	<parallax:ParallaxView>
		<StackLayout class="header-template">
			<Label id="headerLabel" text="Parallax"></Label>
			<Label id="headerLabel2" text="Component"></Label>
		</StackLayout>
		<StackLayout class="body-template">
			<Label id="titleLabel" text="Parallax Template"></Label>
			<TextView editable="false" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut scelerisque, est in viverra vehicula, enim lacus fermentum mi, vel tincidunt libero diam quis nulla. In sem tellus, eleifend quis egestas at, ultricies a neque. Cras facilisis lacinia velit ut lacinia. Phasellus fermentum libero et est ultricies venenatis sit amet ac lectus. Curabitur faucibus nisi id tellus vehicula luctus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc condimentum est id nibh volutpat tempor. Phasellus sodales velit vel dui feugiat, eget tincidunt tortor sollicitudin. Donec nec risus in purus interdum eleifend. Praesent placerat urna aliquet orci suscipit laoreet. In ac purus nec sapien rhoncus egestas.

			Ut at consequat libero, at pharetra purus. Integer mi lorem, luctus eget porttitor vitae, pharetra et urna. Morbi et euismod lacus. Vestibulum a massa odio. Aenean at neque hendrerit, consequat sem et, congue mi. Sed egestas, ante feugiat lacinia tempus, lacus lorem laoreet magna, a hendrerit augue leo vitae risus. Integer ornare odio nec libero elementum malesuada. Cras sem sapien, aliquet eget nibh molestie, finibus dictum augue. Nulla mi metus, finibus id arcu nec, molestie venenatis libero. Morbi a pharetra odio. Maecenas viverra, quam at sollicitudin sodales, diam purus lacinia dolor, vitae scelerisque erat mi nec nibh. Quisque egestas et nunc in pharetra. Sed vitae tincidunt justo, dictum tincidunt nisi. Quisque tempus dolor urna, et mattis velit porta vitae.">
			</TextView>
		</StackLayout>
	</parallax:ParallaxView>
  </StackLayout>
</Page>

```
###Example css
```css
#headerLabel2
{
	font-size: 45;
	horizontal-align: center;
	margin-top:-25;
	color:#B2EBF2;
}
#headerLabel{
	font-size: 45;
	horizontal-align: center;
	padding-top:75;
	color:#B2EBF2;
}
.header-template{
	background-color:#212121;
	background-image:url('~/images/mountains.png');
	background-size:400 320;
}
.body-template textview{
	font-size:20;
	padding:5 15;
	border:none;
}
#titleLabel{
	font-weight:bold;
	font-size:30;
	padding:5 15;

}
```
To use the paralax plugin you need to first import it into your xml layou with  `xmlns:parallax="nativescript-parallax"`

when using the parallax plugin you need at least two layout views inside of the ``<parallax:ParallaxView>`` element. The first layout view being your header, which is seen in the above example with the background image.

###Special thanks to:
 [Nathanael Anderson](https://github.com/NathanaelA) for helping with understand how plugins in {N} work.
 Also Thanks to [Nathan Walker](https://github.com/NathanWalker) for setting up the {N} plugin seed that I used to help get this plugin up and running. More info can be found about it here:
https://github.com/NathanWalker/nativescript-plugin-seed

##License

[MIT](/LICENSE)