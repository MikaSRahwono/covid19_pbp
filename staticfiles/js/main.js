
let provinsi = {
    fetchCorona : function (province) {
        fetch('https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/COVID19_Indonesia_per_Provinsi/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json')
        // fetch('https://vaksincovid19-api.vercel.app/api/vaksin') data vaksin
        // fetch('https://apicovid19indonesia-v2.vercel.app/api/indonesia/provinsi')
        // https://apicovid19indonesia-v2.vercel.app/api  ini cara aksesnya gmn
        .then((response) => response.json())
        .then((data) => this.displayCoronaProvinsi(data, province))
    },
    displayCoronaProvinsi : function (data, province) {
        var flag = false;
        const { features } = data;
        features.map(feature => {
           if (feature.attributes.Provinsi.toLowerCase() == province.toLowerCase()) {
                const { Kasus_Posi, Kasus_Semb, Kasus_Meni, Provinsi} = feature.attributes;
                console.log(Kasus_Posi, Kasus_Semb, Kasus_Meni, Provinsi);
                document.querySelector(".h1-provinsi").innerText = "Data Covid " + Provinsi;
                document.querySelector(".positif-provinsi").innerText = Kasus_Posi.toLocaleString();
                document.querySelector(".sembuh-provinsi").innerText = Kasus_Semb.toLocaleString();
                document.querySelector(".meninggal-provinsi").innerText = Kasus_Meni.toLocaleString();
                document.querySelector(".provinsi").classList.remove("loading");
                document.querySelector(".content-provinsi").classList.remove("loading");
                flag = true;
                return;
            }
        }) 
        
        if (flag != true) {
            popUpGaada(province);
            document.querySelector(".provinsi").classList.add("loading");
            document.querySelector(".content-provinsi").classList.add("loading");
        }
    },
    search : function () {
        var x = document.querySelector(".search-bar").value;
        if (x.toLowerCase() == "jakarta") {
            this.fetchCorona("dki jakarta");
        } else {
            this.fetchCorona(x);
        }
        
    }
}

let globalAndIndonesia = {
    fetchCorona : function () {
        fetch('https://api.quarantine.country/api/v1/summary/latest')
        .then((response) => response.json())
        .then((data) => this.displayGlobal(data) & this.displayIndonesia(data))
    },

    displayIndonesia : function (data) {
        
        const { total_cases, recovered, deaths, name, iso3166a3 } = data.data.regions.indonesia;
        document.querySelector(".positif-indo").innerText = total_cases.toLocaleString();
        document.querySelector(".sembuh-indo").innerText = recovered.toLocaleString();
        document.querySelector(".meninggal-indo").innerText = deaths.toLocaleString();
    },
    displayGlobal : function (data) {
        const { total_cases, recovered, deaths  } = data.data.summary;
        document.querySelector(".positif-global").innerText = total_cases.toLocaleString();
        document.querySelector(".sembuh-global").innerText = recovered.toLocaleString();
        document.querySelector(".meninggal-global").innerText = deaths.toLocaleString();
    }

}

// manggil fetch corona buat data global dan indonesia
globalAndIndonesia.fetchCorona();
// end of  manggil fetch corona buat data global dan indonesia

function popUpGaada(province) {
    alert("Maaf, provinsi " + province.toUpperCase() +  " tidak tersedia di dalam database kami...");
}



// search result buat provinsi
document
    .querySelector(".search button")
    .addEventListener("click", function () {
        provinsi.search();
})

document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if (event.key == "Enter") {
        provinsi.search();
    }
})
// end of search result buat provinsi



// bagian overlay 
function on() {
    document.getElementById("overlay").style.display = "flex";
}

function off() {
    document.getElementById("overlay").style.display = "none";
}

