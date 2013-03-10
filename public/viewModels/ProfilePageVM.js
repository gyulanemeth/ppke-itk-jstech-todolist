define(["ko"], function (ko) {
	return function () {		
		return {
			heroUnit: {
				title: "Yo dude or dudette!",
				imgSrc: "./images/JimiHendrix.png",
				content: "I am the reincarnation of Jimi Hendrix, all kneel and praise me!"
			},
			favProgLangs: [
			               {
			            	   name: "Javascript",
			            	   imgSrc: "./images/JavascriptLogo.png",
			            	   desc: "The most useful programming language nowadays."
			               },
			               {
			            	   name: "Scala",
			            	   imgSrc: "./images/ScalaLogo.jpg",
			            	   desc: "The most promising programming language nowadays."
			               },
			               {
			            	   name: "Haskell",
			            	   imgSrc: "./images/HaskellLogo.png",
			            	   desc: "The most have-to-learn programming language nowadays."
			               }
			               ]
		};
	};
});