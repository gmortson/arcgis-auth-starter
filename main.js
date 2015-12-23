require([
    "esri/identity/OAuthInfo",
    "esri/identity/IdentityManager",
    "dojo/dom",
    "dojo/dom-style",
    "dojo/dom-attr",
    "dojo/on",
    "dojo/domReady!"
	], 	function(
		OAuthInfo, esriId, dom, domStyle, domAttr, on)
	{
      var info = new OAuthInfo({
        //swap this ID out with registered application ID
        appId: "JMz2020u9pXxSJrm",
        // Uncomment the next line and update if using your own portal
        //portalUrl: "https://<host>:<port>/arcgis"
        // Uncomment the next line to prevent the user's signed in state from being shared with other apps on the same domain with the same authNamespace value.
        //authNamespace: "portal_oauth_inline",
        popup: false
      });
      esriId.registerOAuthInfos([info]);

      esriId.checkSignInStatus(info.portalUrl + "/sharing").then(
        function() {
          displayContent();
        }
      ).otherwise(
        function() {
          domStyle.set("sign-in", "display", "flex");
          domStyle.set("sign-out", "display", "none");
        }
      );

      on(dom.byId("sign-in"), "click", function() {
        // user will be redirected to OAuth Sign In page
        esriId.getCredential(info.portalUrl + "/sharing");
      });

      on(dom.byId("sign-out"), "click", function() {
        esriId.destroyCredentials();
        window.location.reload();
      });

      function displayContent() {
          domAttr.set("userId", "innerHTML", info._oAuthCred.userId);
          domStyle.set("sign-in", "display", "none");
          domStyle.set("sign-out", "display", "flex");
          domStyle.set("personalizedPanel", "display", "block");
      }
});