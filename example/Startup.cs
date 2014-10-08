using Microsoft.AspNet.Builder;

namespace GulpExample
{    
    public class Startup
    {
        public void Configure(IApplicationBuilder app)
        {
			app.UseFileServer();
			app.UseErrorPage();
            app.UseWelcomePage();   
        }
    }
}