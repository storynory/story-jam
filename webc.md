Brings first-class components to Eleventy.
Expand any HTML element (including custom elements) to HTML with defined conventions from web standards.
This means that Web Components created with WebC are compatible with server-side rendering (without duplicating author-written markup)
WebC components are Progressive Enhancement friendly.
PERFORMANCE 
Create streamlined component-driven, cache-friendly page-specific JavaScript and CSS bundles. Users will only load the code they need to render that page (or that island).
Easily configurable boundaries for critical component CSS and JavaScript.
Works great with is-land for web component hydration.
Get first-class incremental builds (for page templates, components, and Eleventy layouts) when used with --incremental
Streaming friendly (stream on the Edge 👀)
COMPATIBLE WITH STANDARDS 
Uses parse5 to parse WebC HTML as modern browsers do (a nod to @DasSurma’s work with Vite here)
Shadow DOM and Declarative Shadow DOM friendly (easily switch components between Light DOM and Shadow DOM)
AUTHORING 
Encourages no-quirks mode HTML authoring (and a doctype is optional). WebC throws a helpful error if encounters quirks mode markup.
Easily scope component CSS (or use your own scoping utility).
Tired of importing components? Use global or per-page no-import components.
Async-friendly: All configuration extensions/hooks into WebC are async-friendly out of the box.
For more complex templating needs, render any existing Eleventy template syntax (Liquid, markdown, Nunjucks, etc.) inside of WebC.
RESOURCES 
IndieWeb Avatar for https://11ty.rocks/Introduction to WebC (11ty.rocks) by IndieWeb Avatar for https://darthmall.net/W. Evan Sheehan
IndieWeb Avatar for https://11ty.rocks/Understanding WebC Features and Concepts (11ty.rocks) by IndieWeb Avatar for https://thinkdobecreate.com/Stephanie Eckles
WebC Number Counter Example Source Code and Demo
Seven Demos of Progressive Enhancement using Image Comparison Components and Source Code
First Experience Building with Eleventy's WebC Plugin
Play Video: Crash Course in Eleventy’s new WebC Plugin
Crash Course in Eleventy’s new WebC Plugin
Play Video: Interactive Progressively-enhanced Web Components with WebC
Interactive Progressively-enhanced Web Components with WebC
Play Video: Server-rendered Image Comparison Component
Server-rendered Image Comparison Component ▶25m52s
IndieWeb Avatar for https://zachleat.com/zachleat.com: Adding Components to Eleventy with WebC: a brief history of the motivation behind WebC including influences from the Svelte and Vue communities.
IndieWeb Avatar for https://darthmall.net/11ty.webc.fun: a collection of WebC recipes!
IndieWeb Avatar for https://www.robincussol.com/Robin Cussol: Optimize your img tags with Eleventy Image and WebC
INSTALLATION 
INFO:
Note that WebC support in Eleventy is not bundled with core! You must install the officially supported Eleventy plugin and the plugin requires Eleventy v2.0.0 or newer.
It’s on npm at @11ty/eleventy-plugin-webc!

npm install @11ty/eleventy-plugin-webc
To add support for .webc files in Eleventy, add the plugin in your Eleventy configuration file:

FILENAME .eleventy.js
const pluginWebc = require("@11ty/eleventy-plugin-webc");

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(pluginWebc);
};
You’re only allowed one module.exports in your configuration file. If you already have a configuration file, only copy the require and the addPlugin lines above!

Full options list (defaults shown)
SYNTAX HIGHLIGHTING 
Because WebC is HTML you can configure your editor to treat .webc files as
HTML, this should correctly syntax highlight your WebC files. Your editor of
choice should have some documentation on how to get this working.

USAGE 
There are a few different ways to use WebC in Eleventy:

ADD A NEW .webc FILE 
Adding the plugin will enable support for .webc files in your Eleventy project. Just make a new .webc HTML file in your Eleventy input directory and Eleventy will process it for you! Notably, .webc files will operate WebC in bundler mode, aggregating the CSS and JS in use on each individual page to create a bundle of the assets in use on the page.

WebC uses an HTML parser to process input files: use any HTML here!

FILENAME my-page.webc
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>WebC Example</title>
	</head>
	<body>
		WebC *is* HTML.
	</body>
</html>
NON-TRADITIONAL WEBC USAGE 
Use the Render plugin 
Using Eleventy’s built-in Render plugin allows you to render WebC inside of an existing Liquid, Nunjucks, or 11ty.js template.

View this example in: Liquid Nunjucks 11ty.js Handlebars
SYNTAX Liquid
{% renderTemplate "webc" %}
<my-custom-component></my-custom-component>
{% endrenderTemplate %}
Pre-process HTML input as WebC 
You can use the configuration option to change the default HTML preprocessor (from liquid) to webc. This might look like htmlTemplateEngine: "webc". Read more on the Eleventy documentation: Default Template Engine for HTML Files.

Post-process HTML output as WebC 
This is a (last-resort?) catch-all option to let WebC process .html output files in your project (skipping any .webc input files to avoid double-processing templates). This feature makes use of Eleventy transforms and is most useful when you want to get up and running with WebC on an existing project quickly.

A few drawbacks to the transform method:

This is the slowest build-performance method to implement WebC in a project, so try the other methods first!
The WebC Eleventy transform operates with bundler mode disabled, which means that processes WebC but does not aggregate component JS or CSS. (Upvote this enhancement request)
The transform is disabled by default, you will need to use the useTransform option to enable it.
WEBC REFERENCE 
Note that all webc: attributes are removed from the rendered output HTML.

HTML-ONLY COMPONENTS 
Related: Defining Components in WebC
When a component has only content HTML (no CSS or JavaScript) it will ignore the host component tag in the output HTML. This enables HTML-only components to have zero overhead HTML. (You can opt-out of this behavior with webc:keep.)

Expand for Example
ASSET BUNDLING 
For components that are not HTML-only (they do have CSS or JS), WebC will include the component tag in the output markup (e.g. <my-component>) (for styling or client scripting). (You can opt-out of this behavior with webc:nokeep.)

Expand for Example
Eleventy runs WebC in Bundler mode. That means that when it finds <style>, <link rel="stylesheet">, or <script> elements in component definitions they are removed from the output markup and their content is aggregated together for re-use in asset bundles on the page. Read more about CSS and JS in WebC. (You can opt-out of this behavior with webc:keep.)

webc:keep 
With an HTML-only component, you can use webc:keep on the host component to keep the tag around:

<html-only-component webc:keep></html-only-component>
You can also use webc:keep to opt-out of asset bundling for individual elements inside of a component definition:

<style webc:keep></style>
<script webc:keep></script>
You can also use webc:keep to save a <slot> for use in a client-side custom element.

webc:nokeep 
With an CSS/JS component (not an HTML-only component), you can use webc:nokeep on the host component to drop the tag:

<css-js-component webc:nokeep></css-js-component>
webc:import 
WebC will expand any component it finds using known components. You can also use webc:import to inline import a component definition. This import path is relative to the component file path. WebC checks for circular component dependencies and throws an error if one is encountered.

Related: Defining Components in WebC (global or scoped)
<any-tag-name webc:import="./components/my-component.webc"></any-tag-name>
Added in @11ty/webc@0.6.2You can import directly from an installed npm package. Eleventy will begin to supply WebC components with existing plugins. The Syntax Highlighter (4.2.0 or newer) supplies one that you can use today:

<syntax-highlight language="js" webc:import="npm:@11ty/eleventy-plugin-syntaxhighlight">
function myFunction() {
	return true;
}
</syntax-highlight>
This uses the component tag name (syntax-highlight) to look for a WebC component at node_modules/@11ty/eleventy-plugin-syntaxhighlight/syntax-highlight.webc and imports it for use on this node. This works with a tag name override via webc:is too.

webc:if 
Added in @11ty/webc@0.7.1

Use webc:if to conditionally render elements. Accepts arbitrary JavaScript (and is async-friendly). Similar to dynamic attributes, this also has access to component attributes and properties.

<div webc:if="true">This will render</div>
<div webc:if="false">This will not render</div>
<div webc:if="myAsyncHelper()">If the helper promise resolves to a truthy value, this will render</div>
You can use webc:type="js" (WebC v0.7.1+) to use JavaScript for more complex conditional logic (read more below).

webc:elseif AND webc:else 
Added in @11ty/webc@0.10.0

Adjacent siblings of webc:if can use webc:elseif="" and webc:else for additional conditional logic.

<div webc:if="false">This will not render</div>
<!-- interspersing comments works ok -->
<div webc:elseif="true">This will render</div>
<div webc:else>This will not render</div>
webc:for LOOPS 
Added in @11ty/webc@0.10.0

Use webc:for to loop over data with HTML. It works with Objects and any Iterable (String, Array, Map, Set, etc).

The syntax should feel similar to JavaScript’s for statement.

Arrays (or any other Iterable) 
<!-- renders three div elements -->
<div webc:for="item of [1, 2, 3]" @text="item"></div>

<!-- access the loop index (zero-indexed) -->
<div webc:for="(item, index) of [1, 2, 3]" @text="index"></div>

<!-- name these whatever you’d like -->
<div webc:for="myItem of [1, 2, 3]" @text="myItem"></div>
<div webc:for="(myItem, myIndex) of [1, 2, 3]" @text="myIndex"></div>

<!-- any iterable -->
<div webc:for="item of new Set([1, 2, 3])" @text="item"></div>
Objects 
Note the use of in instead of of.

<!-- renders two div elements -->
<div webc:for="key in { a: 1, b: 2 }" @text="key"></div>

<!-- access the value -->
<div webc:for="(key, value) in { a: 1, b: 2 }" @text="value"></div>

<!-- access the loop index (zero-indexed) -->
<div webc:for="(key, value, index) in { a: 1, b: 2 }" @text="index"></div>

<!-- name these whatever you’d like -->
<div webc:for="(myKey, myValue, myIndex) in { a: 1, b: 2 }" @text="myIndex"></div>

<!-- use `Object.values` or `Object.keys`, sure -->
<div webc:for="value of Object.values({ a: 1, b: 2 })"></div>
<div webc:for="key of Object.keys({ a: 1, b: 2 })"></div>
SLOTS 
Child content optionally precompiles using <slot> and [slot] too. This example is using an HTML-only component.

FILENAME page.webc
<my-component></my-component>
<my-component>This is the default slot</my-component>
FILENAME components/my-component.webc
<p><slot>Fallback slot content</slot></p>
Compiles to:

<p>Fallback slot content</p>
<p>This is the default slot</p>
If your WebC component wants to output a <slot> tag in the compiled markup (for use in client JavaScript), use the webc:keep attribute (e.g. <slot webc:keep>).

INFO:
Per web component standard conventions, if your component file contains no content markup (e.g. empty or only <style>/<script>), <slot></slot> is implied and the default slot content will be included automatically. If the WebC component file does contain content markup, the content passed in as the default slot requires <slot> to be included.
Named slots 
This works with named slots (e.g. <span slot="named-slot">) too.

Expand for Example
ATTRIBUTES AND webc:root 
FILENAME page.webc
<my-component class="sr-only"></my-component>
Inside of your component definition, you can add attributes to the outer host component using webc:root:

FILENAME components/my-component.webc
<template webc:root class="another-class">
	Some component content
</template>
class and style attribute values are merged as expected between the host component and the webc:root element.

Comparing WebC Attribute Data Types
Attributes: HTML attribute strings.
Properties: server-only private HTML attribute strings (not rendered to output).
Dynamic Attributes and Properties: evaluate as JavaScript (any data type, not just strings).
Override the host component tag 
You can use webc:root="override" together to override the host component tag name! This isn’t very useful for HTML-only components (which leave out the host component tag) but is very useful when your component has style/scripts.

FILENAME components/my-component.webc
<button webc:root="override">Some component content</button>
<style>/* Hi */</style>
Added in @11ty/webc@0.9.0This was changed from webc:root webc:keep in WebC v0.9.0.
Nesting 
It’s worth noting also that webc:root can be nested inside of other content—it does not need to exist at the top level of the component definition (framework folks love nested things deeply in div right).

FILENAME components/my-component.webc
<div>
	<div>
		<template webc:root="override" class="another-class">
			Some component content
		</template>
	</div>
</div>
PROPS (PROPERTIES) 
Make any attribute into a prop by prefixing it with @. Props are server-only “private” attributes that don’t end up in the output HTML (they are private to WebC). They are identical to attributes except that they are filtered from the output HTML.

FILENAME page.webc
<my-component @prop="Hello"></my-component>
FILENAME components/my-component.webc
<p @text="prop"></p>
<!-- outputs <p>Hello</p> -->
In the HTML specification, attribute names are lower-case. Added in @11ty/webc@0.8.0Attribute or property names with dashes are converted to camelcase for JS (e.g. <my-component @prop-name="test"> can be used like @text="propName"). More at issue #71.
Comparing WebC Attribute Data Types
Attributes: HTML attribute strings.
Properties: server-only private HTML attribute strings (not rendered to output).
Dynamic Attributes and Properties: evaluate as JavaScript (any data type, not just strings).
DYNAMIC ATTRIBUTES AND PROPERTIES 
Make any attribute or property dynamic (using JavaScript for the value instead of a string) by prefixing it with a colon (:). You have access to host component attributes, props, and page data here!

FILENAME page.webc
<avatar-image src="my-image.jpeg" alt="Zach is documenting this project" :@dynamic-prop="'hello'"></avatar-image>
FILENAME components/avatar-image.webc
<img :src="src" :alt="alt" class="avatar-image">
Added in @11ty/webc@0.9.0The :@ dynamic property prefix was added in WebC v0.9.0.
In the HTML specification, attribute names are lower-case. Added in @11ty/webc@0.8.0Attribute or property names with dashes are converted to camelcase for JS (e.g. <my-component @prop-name="test"> can be used like @text="propName"). More at #71.
The only currently supported webc:* configuration attribute that supports dynamic values is webc:bucket. More to come here: #143 #148
Comparing WebC Attribute Data Types
Attributes: HTML attribute strings.
Properties: server-only private HTML attribute strings (not rendered to output).
Dynamic Attributes and Properties: evaluate as JavaScript (any data type, not just strings).
@attributes 
Added in @11ty/webc@0.9.0You can use @attributes to render all of the attributes (including on host component) to the current node.

FILENAME components/avatar-image.webc
<!-- will render all attributes including `src` and `alt` from the host component -->
<img @attributes class="avatar-image">
You can use this to render an arbitrary object as attributes too (note the parentheses to avoid JavaScript parsing as a block + label):

<img @attributes="({ myattribute: 'myValue'})">
@html 
We surface a special @html prop to override any tag content with custom JavaScript.

<template @html="'Template HTML'"></template>
<template @html="dataProperty"></template>
<!-- webc:nokeep will replace the outer element -->
<template @html="'Template HTML'" webc:nokeep></template>
Content returned from the @html prop will be processed as WebC—return any WebC content here! Added in @11ty/webc@0.5.0
Using webc:raw will prevent processing the result as WebC Added in @11ty/webc@0.6.0
Use @raw as an alias for webc:raw @html Added in @11ty/webc@0.7.1
<!-- No reprocessing as WebC (useful in Eleventy layouts) -->
<!-- Where `myHtmlContent` is a variable holding an arbitrary HTML string -->
<template @raw="myHtmlContent" webc:nokeep></template>
@raw 
Added in @11ty/webc@0.7.1

As noted in @html, you can use @raw as an alias for webc:raw @html.

@text 
Added in @11ty/webc@0.6.0

We provide a special @text prop to override any tag content with custom JavaScript. The entire value returned here will be escaped!

<p @text="dataProperty"></p>

<!-- When dataProperty contains `<p>This is text</p>`, this renders: -->
<p>&lt;p&gt;This is text&lt;/p&gt;</p>
<!-- webc:nokeep will replace the outer element -->
<p @text="dataProperty" webc:nokeep></p>
Content returned from the @text prop will not be processed as WebC.
webc:is 
Remap a component to another component name.

<div webc:is="my-component"></div>

<!-- equivalent to -->
<my-component></my-component>
webc:scoped 
We include a lightweight mechanism (webc:scoped) to scope component CSS. Selectors are prefixed with a new component class name. The class name is based on a hash of the style content (for fancy de-duplication of identical component styles).

Expand for example
INFO:
CSS bundling opinion alert: Some folks recommend using Declarative Shadow DOM for component style encapsulation. This is a great method! It has 2 major drawbacks:

1. The progressive enhancement story requires ubiquitous browser support before using it for content in the critical rendering path.
2. It requires <style> duplication in each instance of the component.

Just be aware of these tradeoffs and note that you can use both methods in WebC!
webc:scoped="my-prefix" 
You can also specify an attribute value to webc:scoped to hard code your own component prefix (e.g. <style webc:scoped="my-prefix">). This allows the CSS to look a bit more friendly and readable. We will automatically check for duplicate values in your component tree and throw an error if collisions occur.

USING JAVASCRIPT TO SETUP YOUR COMPONENT 
Added in @11ty/webc@0.9.0You can now also use <script webc:setup> to run arbitrary JavaScript and provide data and markup to your component. Any top level variables declared here are available in your component as local data.

This is similar to using JavaScript as a custom Eleventy Front Matter type although data in webc:setup is scoped to the component and does not flow back up in the Data Cascade.

FILENAME components/my-component.webc
<script webc:setup>
const myHtml = "<my-webc-component></my-webc-component>";

function alwaysBlue() {
	return "blue";
}
</script>

<div @html="myHtml"></div>
<div @raw="myHtml"></div><!-- @raw does not reprocess as WebC -->
<div @html="alwaysBlue()"></div>
Works with var, let, const, function, Array and Object destructuring assignment.

Uses the node-retrieve-globals package.
USING TEMPLATE SYNTAX TO GENERATE CONTENT 
The Custom Transforms feature (e.g. webc:type) in the Eleventy WebC plugin has been wired up to the Eleventy Render plugin to allow you to use existing Eleventy template syntax inside of WebC.

INFO:
Note that the webc:type="11ty" feature is exclusive to the Eleventy WebC plugin and is not available in non-Eleventy independent WebC.
Use webc:type="11ty" with the 11ty:type attribute to specify a valid template syntax.

FILENAME my-page.webc
---
frontmatterdata: "Hello from Front Matter"
---
<template webc:type="11ty" 11ty:type="liquid,md">
{% assign t = "Liquid in WebC" %}
## {{ t }}

_{{ frontmatterdata }}_
</template>
You have full access to the data cascade here (note frontmatterdata is set in front matter above).
Added in @11ty/webc@0.5.0Content returned from custom transforms on <template> (or webc:is="template") nodes will be processed as WebC—return any WebC content here!
USING JAVASCRIPT TO GENERATE CONTENT 
You can also transform individual element content using webc:type. In addition to webc:type="11ty", there are three more bundled types:

webc:type="js" Added in @11ty/webc@0.7.1
webc:type="render" (superceded by webc:type="js")
webc:type="css:scoped" (internal for webc:scoped—but overridable!)
JavaScript Render Functions: webc:type="js" and webc:type="render" 
Added in @11ty/webc@0.7.1 Run any arbitrary server JavaScript in WebC. Outputs the result of the very last statement executed in the script. Async-friendly (return a promise and we’ll resolve it).

FILENAME page.webc
<img src="my-image.jpeg" alt="An excited Zach is trying to finish this documentation">
FILENAME components/img.webc
<script webc:type="js" webc:root>
if(!alt) {
	throw new Error("oh no you didn’t");
}
`<img src="${src}" alt="${alt}">`;
</script>
Expand to see this example with webc:type="render"
Or use a JavaScript render function to generate some CSS:

FILENAME page.webc
<style webc:is="add-banner-to-css" @license="MIT licensed">
p { color: rebeccapurple; }
</style>
FILENAME components/add-banner-to-css.webc
<template webc:is="style" webc:root="override">
	<script webc:type="js">`/* ${license} */`</script>
	<slot></slot>
</template>
Expand to see this example with webc:type="render"
Expand to see another example of a more complex conditional using webc:type="js"
Bonus tips:

You can use webc:scoped webc:is="style" webc:type="js" (or webc:type="render") to generate scoped CSS using JavaScript! Read more at webc:scoped.
You have access to the component attributes and props in the render function (which is covered in another section!).
Added in @11ty/webc@0.9.0Using webc:type="js" has an implied webc:is="template" to return content that will be reprocessed as WebC (HTML). You can override this with your own webc:is attribute to generate a different tag (e.g. webc:is="script" or webc:is="style").
Added in @11ty/webc@0.9.0Using webc:type="js" has an implied webc:nokeep to skip outputting the outer node. You can add webc:keep to override this behavior.
Extra data for JavaScript Render Functions 
webc.attributes: Added in @11ty/webc@0.9.0 an object literal representing the current element’s attributes.
webc.renderAttributes: Added in @11ty/webc@0.9.0 a method to render public attributes to a string.
webc.filterPublicAttributes: Added in @11ty/webc@0.10.1 a method to filter webc.attributes, returning an object with only public attributes. Usage: webc.filterPublicAttributes(webc.attributes)
webc.escapeText: Added in @11ty/webc@0.10.1 encodes all characters that have to be escaped in HTML text (via the entities package)
webc.escapeAttribute: Added in @11ty/webc@0.10.1 encodes all characters that have to be escaped in HTML attributes (via the entities package)
Read more at Issue #104.

Expand to see an img component example
webc:raw 
Use webc:raw to opt-out of WebC template processing for all child content of the current node. Notably, attributes on the current node will be processed. This works well with <template>!

FILENAME components/my-component.webc
<template webc:raw>
Leave me out of this.
<style>
p { color: rebeccapurple; }
</style>
</template>
Related: @raw property
webc:ignore 
Added in @11ty/webc@0.9.0Use webc:ignore to completely ignore a node and not process or output anything to do with it. Useful for server-side comments or documentation on a component.

FILENAME components/my-component.webc
<template webc:ignore>
Here’s how you might use this component:

<my-component>Nothing in here will be processed</my-component>
</template>
SERVER-ONLY COMMENTS 
Added in @11ty/webc@0.10.0

Instead of an HTML comment that will show up in rendered output, you can add one or more dashes to the beginning/end to tell WebC to strip this from the output. Great for server-side comments.

FILENAME components/my-component.webc
<!--- WebC will remove this --->
<!-- This will *not* be removed and is rendered to the output -->
<!------- WebC will remove this, too ------->
CUSTOM TRANSFORMS 
This plugin provides a few transforms out of the box: webc:type="js", webc:type="render", webc:type="css:scoped", and webc:type="11ty".

However, adding your own webc:type Custom Transform directly to WebC is not yet available in the Eleventy WebC plugin! If this is something folks would like to see added, please let us know!

Do note that you can add your own custom template engine which would be available via webc:type="11ty" (e.g. <style webc:type="11ty" 11ty:type="sass">).

HELPER FUNCTIONS 
WebC Helpers are JavaScript functions available in dynamic attributes, @html, @raw, and render functions.

Eleventy-provided Helpers 
Added in @11ty/eleventy-plugin-webc@0.5.0Included with Eleventy WebC, JavaScript template functions and Universal Filters are provided automatically as WebC Helpers.

This includes url, slugify, log and others!

<!-- Use the  Eleventy provided `url` universal filter -->
<a :href="url('/local-path/')">My Link</a>
Supply your own Helper 
FILENAME .eleventy.js
module.exports = function(eleventyConfig) {
	// via Universal Filter
	eleventyConfig.addFilter("alwaysRed", () => "Red");

	// or via JavaScript Template Function directly
	eleventyConfig.addJavaScriptFunction("alwaysBlue", () => "Blue");

	// Don’t forget to add the WebC plugin in your config file too!
};
<div @html="alwaysRed()"></div>
<div @html="alwaysBlue()"></div>

<!-- renders as: -->
<div>Red</div>
<div>Blue</div>
SUBTLETIES AND LIMITATIONS 
Void elements 
Custom elements (per specification) are not supported as void elements: they require both a starting and ending tag.

Practically speaking, this means a WebC component can not be self-closing. You can workaround this limitation using webc:is (e.g. <img webc:is="my-component">).

<head> Components 
There are a few wrinkles when using an HTML parser with custom elements. Notably, the parser tries to force custom element children in the <head> over to the <body>. To workaround this limitation, use webc:is.

Expand for a few example workarounds
Rendering Modes 
There are two different rendering modes in Eleventy: page and component. We attempt to guess the rendering mode that you’d like based on the markup you supply. The page rendering mode is for rendering full HTML pages. The component rendering mode is for fragments of HTML. Most of the time you won’t need to worry about this distinction but it is included in the documentation for completeness.

page is used when the markup starts with <!doctype (or <!DOCTYPE) or <html (WebC forces no-quirks parsing).
component is used otherwise.
Differences from HTML parsing 
Added in @11ty/webc@0.9.0WebC processes content inside of both <template> and <noscript> tags. The HTML parser treats these as plaintext.

ELEVENTY + WEBC FEATURES 
FRONT MATTER 
WebC in Eleventy works automatically with standard Eleventy conventions for front matter (though front matter in Eleventy is optional).

FILENAME with-front-matter.webc
---
layout: "my-layout.webc"
---
WebC *is* HTML.
Expand to see an example my-layout.webc
Notable note: front matter (per standard Eleventy conventions) is supported in page-level templates only (.webc files in your input directory) and not in components (see below).

DEFINING COMPONENTS 
Components are the ✨magic✨ of WebC and there are a few ways to define components in WebC:

Use global no-import components specified in your config file.
Specify a glob of no-import components at a directory or template level in the data cascade.
You can use webc:import inside of your components to import another component directly.
INFO:
Notably, WebC components can have any valid HTML tag name and are not restricted to the same naming limitations as custom elements (which require a dash in the name).
Global no-import Components 
Use the components property in the options passed to addPlugin in your Eleventy configuration file to specify project-wide WebC component files available for use in any page.

We accept:

String (file path or glob)
Array (of file paths or globs) Added in @11ty/eleventy-plugin-webc@0.9.2
npm: prefix aliases Added in @11ty/eleventy-plugin-webc@0.9.2
FILENAME .eleventy.js
const pluginWebc = require("@11ty/eleventy-plugin-webc");

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(pluginWebc, {
		// Glob to find no-import global components
		// This path is relative to the project-root!
		// The default value is shown:
		components: "_components/**/*.webc",

		// or an Array (Eleventy WebC v0.9.2+)
		components: [
			"_components/**/*.webc",
			"npm:@11ty/is-land/*.webc"
			"npm:@11ty/eleventy-plugin-syntaxhighlight/*.webc"
		]
	});
};
Notably, the path for components is relative to your project root (not your project’s input directory).

The file names of components found in the glob determine the global tag name used in your project (e.g. _components/my-component.webc will give you access to <my-component>).

Declaring Components in Front Matter 
You can also use and configure specific components in front matter (or, via any part of the data cascade—scoped to a folder or a template) by assigning a glob (or array of globs) to the property at webc.components:

FILENAME my-directory/my-page.webc
---
layout: "my-layout.webc"
webc:
  components: "./webc/*.webc"
---
<my-webc-component>WebC *is* HTML.</my-webc-component>
WARNING:
By default these paths are relative to the template file. If you’re setting this in the data cascade in a directory data file that will apply multiple child folders deep, it might be better to:

Use the global no-import components option.
Use ~/ as a prefix (e.g. ~/my-directory/webc/*.webc) to alias to the project’s root directory.
OFFICIAL WEBC COMPONENTS 
The following plugins offer official WebC components for use in your projects:

@11ty/is-land supplies <is-land>
Example: <is-land webc:import="npm:@11ty/is-land">
Read more at Use with is-land
@11ty/eleventy-plugin-syntaxhighlight supplies <syntax-highlight>
Example: <syntax-highlight language="js" webc:import="npm:@11ty/eleventy-plugin-syntaxhighlight">
Read more at Syntax Highlighting Plugin
@11ty/eleventy-img supplies <eleventy-image>
Added in Image v3.1.0
Example: <img webc:is="eleventy-image" webc:import="npm:@11ty/eleventy-img">
Read more at the Image utility.
CSS AND JS (BUNDLER MODE) 
Eleventy WebC will bundle any specific page’s assets (CSS and JS used by components on the page). These are automatically rolled up when a component uses <script>, <script src>, <style>, or <link rel="stylesheet">. You can use this to implement component-driven Critical CSS.

INFO:
Note on Declarative Shadow DOM: elements inside of declarative shadow root template (<template shadowrootmode> or the deprecated <template shadowroot>) are left as is and not bundled.
FILENAME _components/my-webc-component.webc
<style>/* This is component CSS */</style>
<script>/* This is component JS */</script>

<!-- Local file references work too -->
<link rel="stylesheet" href="my-file.css">
<script src="my-file.js"></script>
As shown above this also includes <link rel="stylesheet"> and <script src> when the URLs point to files on the file system (remote URL sources are not yet supported).

You can opt-out of bundling on a per-element basis using webc:keep.

FILENAME _includes/layout.webc
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>WebC Example</title>

		<!-- inline bundles -->
		<style @raw="getBundle('css')" webc:keep></style>
		<script @raw="getBundle('js')" webc:keep></script>

		<!-- or write your bundle to a file -->
		<link rel="stylesheet" :href="getBundleFileUrl('css')">
		<script :src="getBundleFileUrl('js')"></script>
	</head>
	<body @raw="content"></body>
</html>
Added in @11ty/eleventy-plugin-webc@0.9.0Eleventy WebC uses eleventy-plugin-bundle behind the scenes to implement bundling. getBundle('css') and getBundle('js') can now be used instead of getCss(page.url) and getJs(page.url) respectively.
Added in @11ty/webc@0.8.0webc:keep is required on <style> and <script> in your layout files to prevent re-bundling the bundles.
Added in @11ty/webc@0.8.0The getCss and getJs helpers are now available to all WebC templates without restriction. Previous versions required them to be used in an Eleventy Layout file.
@raw was Added in @11ty/webc@0.7.1. Previous versions can use webc:raw @html.
Bundle Code Ordering 
The order of the code in these bundles is determined by the dependency order of the components, from most specific to least specific!

Expand to see an example
Access Bundles in other Template Engines 
You can access these bundles in other templates types too (.njk, .liquid, etc.).

Added in @11ty/eleventy-plugin-webc@0.9.0Eleventy WebC uses eleventy-plugin-bundle behind the scenes to implement bundling. This plugin provides getBundle and getBundleFileUrl universal shortcodes for use in any template type (including WebC as shown above).

WebC v0.8.0 and older: Check out the deprecated (but still in place for backwards compatibility) webcGetCss and webcGetJs universal filters for bundle output.
ASSET BUCKETING 
There is an additional layer of bundling here that you can use that we call Bucketing. Components can use webc:bucket to output to any arbitrary bucket name.

In this component, we have component code that outputs to two separate buckets:

FILENAME _components/my-webc-component.webc
<style>/* This CSS is put into the default bucket */</style>
<script>/* This JS is put into the default bucket */</script>
<style webc:bucket="defer">/* This CSS is put into the `defer` bucket */</style>
<script webc:bucket="defer">/* This JS is put into the `defer` bucket */</script>
When <my-webc-component> is used on a page, it will roll the assets to the page-specific bucket bundles for CSS and JavaScript.

Then you can output those bucket bundles anywhere on your page like this (here we’re using an Eleventy layout file):

FILENAME _includes/layout.webc
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>WebC Example</title>
		<!-- Default bucket -->
		<style @raw="getBundle('css')" webc:keep></style>
		<script @raw="getBundle('js')" webc:keep></script>
	</head>
	<body>
		<template @raw="content" webc:nokeep></template>

		<!-- `defer` bucket -->
		<style @raw="getBundle('css', 'defer')" webc:keep></style>
		<script @raw="getBundle('js', 'defer')" webc:keep></script>
	</body>
</html>
Added in @11ty/webc@0.8.0webc:keep is required on <style> and <script> in your layout files to prevent re-bundling the bundles.
Added in @11ty/webc@0.9.1:webc:bucket (dynamic attribute) is supported to set this value via JavaScript. #120
Cascading Asset Buckets 
Added in @11ty/webc@0.9.1 Additionally webc:bucket can be added to any tag and will cascade to all child content.

Consider this WebC page:

FILENAME index.webc
<!-- has an implied webc:bucket="default" -->
<my-component></my-component>

<div webc:bucket="defer">
	<!-- each of these have webc:bucket="defer" -->
	<!-- (including any nested components inside, too) -->
	<footnote-references></footnote-references>

	<my-footer></my-footer>
</div>
Setting webc:bucket now cascades to all of the children as if they had webc:bucket="defer" assigned to each of them individually. All assets used in those components will now be rolled up into the defer bucket.

Play Video: Learn how we used webc:bucket to create Critical CSS and JS bundles for 11ty.dev
Learn how we used webc:bucket to create Critical CSS and JS bundles for 11ty.dev
Conflicts and hoisting
What happens when a component is used in multiple distinct buckets?

FILENAME index.webc
<!-- has an implied webc:bucket="default" -->
<my-component></my-component>

<div webc:bucket="defer">
	<my-component></my-component>
</div>
When duplicates and conflicts occur, WebC will hoist the component code to find the nearest shared bucket for you. In the above example, the CSS and JS for <my-component> will be loaded in the default bucket and only in the default bucket.

USE WITH is-land 
You can also use this out of the box with Eleventy’s is-land component for web component hydration.

At the component level, components can declare their own is-land loading conditions.

FILENAME index.webc
<is-land on:visible webc:import="npm:@11ty/is-land">
	<template data-island>
		<!-- CSS -->
		<style webc:keep>
		/* This CSS applies on:visible */
		</style>
		<link rel="stylesheet" href="arbitrary.css" webc:keep>

		<!-- JS -->
		<script type="module" webc:keep>
		console.log("This JavaScript runs on:visible");
		</script>
		<script type="module" src="arbitrary.js" webc:keep></script>
	</template>
</is-land>
