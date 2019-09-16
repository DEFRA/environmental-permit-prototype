var getDescriptionForCode = function(code) {
    code = code.replace(/\s+/g, '')
    code = code.substr(0, 2) + ' ' + code.substr(2, 2) + ' ' + code.substr(4, 3)

    var referenceCode = referenceCodes.find((referenceCode) => {
        return referenceCode.code === code
    })
    return referenceCode ? referenceCode.description : ""
}

const referenceCodes = [
{
    "code": "01 01 01",
    "description": "wastes from mineral metalliferous excavation"
},
{
    "code": "01 01 02",
    "description": "wastes from mineral non-metalliferous excavation"
},
{
    "code": "01 03 04*",
    "description": "acid-generating tailings from processing of sulphide ore"
},
{
    "code": "01 03 05*",
    "description": "other tailings containing hazardous substances"
},
{
    "code": "01 03 06",
    "description": "tailings other than those mentioned in 01 03 04 and 01 03 05"
},
{
    "code": "01 03 07*",
    "description": "other wastes containing hazardous substances from physical and chemical processing of metalliferous minerals"
},
{
    "code": "01 03 08",
    "description": "dusty and powdery wastes other than those mentioned in 01 03 07"
},
{
    "code": "01 03 09",
    "description": "red mud from alumina production other than the wastes mentioned in 01 03 10"
},
{
    "code": "01 03 10*",
    "description": "red mud from alumina production containing hazardous substances other than the wastes mentioned in 01 03 07"
},
{
    "code": "01 03 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "01 04 07*",
    "description": "wastes containing hazardous substances from physical and chemical processing of non-metalliferous minerals"
},
{
    "code": "01 04 08",
    "description": "waste gravel and crushed rocks other than those mentioned in 01 04 07"
},
{
    "code": "01 04 09",
    "description": "waste sand and clays"
},
{
    "code": "01 04 10",
    "description": "dusty and powdery wastes other than those mentioned in 01 04 07"
},
{
    "code": "01 04 11",
    "description": "wastes from potash and rock salt processing other than those mentioned in 01 04 07"
},
{
    "code": "01 04 12",
    "description": "tailings and other wastes from washing and cleaning of minerals other than those mentioned in 01 04 07 and 01 04 11"
},
{
    "code": "01 04 13",
    "description": "wastes from stone cutting and sawing other than those mentioned in 01 04 07"
},
{
    "code": "01 04 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "01 05 04",
    "description": "freshwater drilling muds and wastes"
},
{
    "code": "01 05 05*",
    "description": "oil-containing drilling muds and wastes"
},
{
    "code": "01 05 06*",
    "description": "drilling muds and other drilling wastes containing hazardous substances"
},
{
    "code": "01 05 07",
    "description": "barite-containing drilling muds and wastes other than those mentioned in 01 05 05 and 01 05 06"
},
{
    "code": "01 05 08",
    "description": "chloride-containing drilling muds and wastes other than those mentioned in 01 05 05 and 01 05 06"
},
{
    "code": "01 05 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "02 01 01",
    "description": "sludges from washing and cleaning"
},
{
    "code": "02 01 02",
    "description": "animal-tissue waste"
},
{
    "code": "02 01 03",
    "description": "plant-tissue waste"
},
{
    "code": "02 01 04",
    "description": "waste plastics (except packaging)"
},
{
    "code": "02 01 06",
    "description": "animal faeces, urine and manure (including spoiled straw), effluent, collected separately and treated off-site"
},
{
    "code": "02 01 07",
    "description": "wastes from forestry"
},
{
    "code": "02 01 08*",
    "description": "agrochemical waste containing hazardous substances"
},
{
    "code": "02 01 09",
    "description": "agrochemical waste other than those mentioned in 02 01 08"
},
{
    "code": "02 01 10",
    "description": "waste metal"
},
{
    "code": "02 01 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "02 02 01",
    "description": "sludges from washing and cleaning"
},
{
    "code": "02 02 02",
    "description": "animal-tissue waste"
},
{
    "code": "02 02 03",
    "description": "materials unsuitable for consumption or processing"
},
{
    "code": "02 02 04",
    "description": "sludges from on-site effluent treatment"
},
{
    "code": "02 02 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "02 03 01",
    "description": "sludges from washing, cleaning, peeling, centrifuging and separation"
},
{
    "code": "02 03 02",
    "description": "wastes from preserving agents"
},
{
    "code": "02 03 03",
    "description": "wastes from solvent extraction"
},
{
    "code": "02 03 04",
    "description": "materials unsuitable for consumption or processing"
},
{
    "code": "02 03 05",
    "description": "sludges from on-site effluent treatment"
},
{
    "code": "02 03 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "02 04 01",
    "description": "soil from cleaning and washing beet"
},
{
    "code": "02 04 02",
    "description": "off-specification calcium carbonate"
},
{
    "code": "02 04 03",
    "description": "sludges from on-site effluent treatment"
},
{
    "code": "02 04 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "02 05 01",
    "description": "materials unsuitable for consumption or processing"
},
{
    "code": "02 05 02",
    "description": "sludges from on-site effluent treatment"
},
{
    "code": "02 05 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "02 06 01",
    "description": "materials unsuitable for consumption or processing"
},
{
    "code": "02 06 02",
    "description": "wastes from preserving agents"
},
{
    "code": "02 06 03",
    "description": "sludges from on-site effluent treatment"
},
{
    "code": "02 06 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "02 07 01",
    "description": "wastes from washing, cleaning and mechanical reduction of raw materials"
},
{
    "code": "02 07 02",
    "description": "wastes from spirits distillation"
},
{
    "code": "02 07 03",
    "description": "wastes from chemical treatment"
},
{
    "code": "02 07 04",
    "description": "materials unsuitable for consumption or processing"
},
{
    "code": "02 07 05",
    "description": "sludges from on-site effluent treatment"
},
{
    "code": "02 07 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "03 01",
    "description": "wastes from wood processing and the production of panels and furniture"
},
{
    "code": "03 01 01",
    "description": "waste bark and cork"
},
{
    "code": "03 01 04*",
    "description": "sawdust, shavings, cuttings, wood, particle board and veneer containing hazardous substances"
},
{
    "code": "03 01 05",
    "description": "sawdust, shavings, cuttings, wood, particle board and veneer other than those mentioned in 03 01 04"
},
{
    "code": "03 01 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "03 02 01*",
    "description": "non-halogenated organic wood preservatives"
},
{
    "code": "03 02 02*",
    "description": "organochlorinated wood preservatives"
},
{
    "code": "03 02 03*",
    "description": "organometallic wood preservatives"
},
{
    "code": "03 02 04*",
    "description": "inorganic wood preservatives"
},
{
    "code": "03 02 05*",
    "description": "other wood preservatives containing hazardous substances"
},
{
    "code": "03 02 99",
    "description": "wood preservatives not otherwise specified"
},
{
    "code": "03 03 01",
    "description": "waste bark and wood"
},
{
    "code": "03 03 02",
    "description": "green liquor sludge (from recovery of cooking liquor)"
},
{
    "code": "03 03 05",
    "description": "de-inking sludges from paper recycling"
},
{
    "code": "03 03 07",
    "description": "mechanically separated rejects from pulping of waste paper and cardboard"
},
{
    "code": "03 03 08",
    "description": "wastes from sorting of paper and cardboard destined for recycling"
},
{
    "code": "03 03 09",
    "description": "lime mud waste"
},
{
    "code": "03 03 10",
    "description": "fibre rejects, fibre-, filler- and coating-sludges from mechanical separation"
},
{
    "code": "03 03 11",
    "description": "sludges from on-site effluent treatment other than those mentioned in 03 03 10"
},
{
    "code": "03 03 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "04 01 01",
    "description": "fleshings and lime split wastes"
},
{
    "code": "04 01 02",
    "description": "liming waste"
},
{
    "code": "04 01 03*",
    "description": "degreasing wastes containing solvents without a liquid phase"
},
{
    "code": "04 01 04",
    "description": "tanning liquor containing chromium"
},
{
    "code": "04 01 05",
    "description": "tanning liquor free of chromium"
},
{
    "code": "04 01 06",
    "description": "sludges, in particular from on-site effluent treatment containing chromium"
},
{
    "code": "04 01 07",
    "description": "sludges, in particular from on-site effluent treatment free of chromium"
},
{
    "code": "04 01 08",
    "description": "waste tanned leather (blue sheetings, shavings, cuttings, buffing dust) containing chromium"
},
{
    "code": "04 01 09",
    "description": "wastes from dressing and finishing"
},
{
    "code": "04 01 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "04 02 09",
    "description": "wastes from composite materials (impregnated textile, elastomer, plastomer)"
},
{
    "code": "04 02 10",
    "description": "organic matter from natural products (for example grease, wax)"
},
{
    "code": "04 02 14*",
    "description": "wastes from finishing containing organic solvents"
},
{
    "code": "04 02 15",
    "description": "wastes from finishing other than those mentioned in 04 02 14"
},
{
    "code": "04 02 16*",
    "description": "dyestuffs and pigments containing hazardous substances"
},
{
    "code": "04 02 17",
    "description": "dyestuffs and pigments other than those mentioned in 04 02 16"
},
{
    "code": "04 02 19*",
    "description": "sludges from on-site effluent treatment containing hazardous substances"
},
{
    "code": "04 02 20",
    "description": "sludges from on-site effluent treatment other than those mentioned in 04 02 19"
},
{
    "code": "04 02 21",
    "description": "wastes from unprocessed textile fibres"
},
{
    "code": "04 02 22",
    "description": "wastes from processed textile fibres"
},
{
    "code": "04 02 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "05 01 02*",
    "description": "desalter sludges"
},
{
    "code": "05 01 03*",
    "description": "tank bottom sludges"
},
{
    "code": "05 01 04*",
    "description": "acid alkyl sludges"
},
{
    "code": "05 01 05*",
    "description": "oil spills"
},
{
    "code": "05 01 06*",
    "description": "oily sludges from maintenance operations of the plant or equipment"
},
{
    "code": "05 01 07*",
    "description": "acid tars"
},
{
    "code": "05 01 08*",
    "description": "other tars"
},
{
    "code": "05 01 09*",
    "description": "sludges from on-site effluent treatment containing hazardous substances"
},
{
    "code": "05 01 10",
    "description": "sludges from on-site effluent treatment other than those mentioned in 05 01 09"
},
{
    "code": "05 01 11*",
    "description": "wastes from cleaning of fuels with bases"
},
{
    "code": "05 01 12*",
    "description": "oil containing acids"
},
{
    "code": "05 01 13",
    "description": "boiler feedwater sludges"
},
{
    "code": "05 01 14",
    "description": "wastes from cooling columns"
},
{
    "code": "05 01 15*",
    "description": "spent filter clays"
},
{
    "code": "05 01 16",
    "description": "sulphur-containing wastes from petroleum desulphurisation"
},
{
    "code": "05 01 17",
    "description": "bitumen"
},
{
    "code": "05 01 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "05 06 01*",
    "description": "acid tars"
},
{
    "code": "05 06 03*",
    "description": "other tars"
},
{
    "code": "05 06 04",
    "description": "waste from cooling columns"
},
{
    "code": "05 06 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "05 07 01*",
    "description": "wastes containing mercury"
},
{
    "code": "05 07 02",
    "description": "wastes containing sulphur"
},
{
    "code": "05 07 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "06 01 01*",
    "description": "sulphuric acid and sulphurous acid"
},
{
    "code": "06 01 02*",
    "description": "hydrochloric acid"
},
{
    "code": "06 01 03*",
    "description": "hydrofluoric acid"
},
{
    "code": "06 01 04*",
    "description": "phosphoric and phosphorous acid"
},
{
    "code": "06 01 05*",
    "description": "nitric acid and nitrous acid"
},
{
    "code": "06 01 06*",
    "description": "other acids"
},
{
    "code": "06 01 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "06 02 01*",
    "description": "calcium hydroxide"
},
{
    "code": "06 02 03*",
    "description": "ammonium hydroxide"
},
{
    "code": "06 02 04*",
    "description": "sodium and potassium hydroxide"
},
{
    "code": "06 02 05*",
    "description": "other bases"
},
{
    "code": "06 02 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "06 03 11*",
    "description": "solid salts and solutions containing cyanides"
},
{
    "code": "06 03 13*",
    "description": "solid salts and solutions containing heavy metals"
},
{
    "code": "06 03 14",
    "description": "solid salts and solutions other than those mentioned in 06 03 11 and 06 03 13"
},
{
    "code": "06 03 15*",
    "description": "metallic oxides containing heavy metals"
},
{
    "code": "06 03 16",
    "description": "metallic oxides other than those mentioned in 06 03 15"
},
{
    "code": "06 03 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "06 04 03*",
    "description": "wastes containing arsenic"
},
{
    "code": "06 04 04*",
    "description": "wastes containing mercury"
},
{
    "code": "06 04 05*",
    "description": "wastes containing other heavy metals"
},
{
    "code": "06 04 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "06 05 02*",
    "description": "sludges from on-site effluent treatment containing hazardous substances"
},
{
    "code": "06 05 03",
    "description": "sludges from on-site effluent treatment other than those mentioned in 06 05 02"
},
{
    "code": "06 06 02*",
    "description": "wastes containing hazardous sulphides"
},
{
    "code": "06 06 03",
    "description": "wastes containing sulphides other than those mentioned in 06 06 02"
},
{
    "code": "06 06 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "06 07 01*",
    "description": "wastes containing asbestos from electrolysis"
},
{
    "code": "06 07 02*",
    "description": "activated carbon from chlorine production"
},
{
    "code": "06 07 03*",
    "description": "barium sulphate sludge containing mercury"
},
{
    "code": "06 07 04*",
    "description": "solutions and acids, for example contact acid"
},
{
    "code": "06 07 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "06 08 02*",
    "description": "waste containing hazardous chlorosilanes"
},
{
    "code": "06 08 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "06 09 02",
    "description": "phosphorous slag"
},
{
    "code": "06 09 03*",
    "description": "calcium-based reaction wastes containing or contaminated with hazardous substances"
},
{
    "code": "06 09 04",
    "description": "calcium-based reaction wastes other than those mentioned in 06 09 03"
},
{
    "code": "06 09 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "06 10 02*",
    "description": "wastes containing hazardous substances"
},
{
    "code": "06 10 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "06 11 01",
    "description": "calcium-based reaction wastes from titanium dioxide production"
},
{
    "code": "06 11 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "06 13 01*",
    "description": "inorganic plant protection products, wood-preserving agents and other biocides"
},
{
    "code": "06 13 02*",
    "description": "spent activated carbon (except 06 07 02)"
},
{
    "code": "06 13 03",
    "description": "carbon black"
},
{
    "code": "06 13 04*",
    "description": "wastes from asbestos processing"
},
{
    "code": "06 13 05*",
    "description": "soot"
},
{
    "code": "06 13 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "07 01 01*",
    "description": "aqueous washing liquids and mother liquors"
},
{
    "code": "07 01 03*",
    "description": "organic halogenated solvents, washing liquids and mother liquors"
},
{
    "code": "07 01 04*",
    "description": "other organic solvents, washing liquids and mother liquors"
},
{
    "code": "07 01 07*",
    "description": "halogenated still bottoms and reaction residues"
},
{
    "code": "07 01 08*",
    "description": "other still bottoms and reaction residues"
},
{
    "code": "07 01 09*",
    "description": "halogenated filter cakes and spent absorbents"
},
{
    "code": "07 01 10*",
    "description": "other filter cakes and spent absorbents"
},
{
    "code": "07 01 11*",
    "description": "sludges from on-site effluent treatment containing hazardous substances"
},
{
    "code": "07 01 12",
    "description": "sludges from on-site effluent treatment other than those mentioned in 07 01 11"
},
{
    "code": "07 01 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "07 02 01*",
    "description": "aqueous washing liquids and mother liquors"
},
{
    "code": "07 02 03*",
    "description": "organic halogenated solvents, washing liquids and mother liquors"
},
{
    "code": "07 02 04*",
    "description": "other organic solvents, washing liquids and mother liquors"
},
{
    "code": "07 02 07*",
    "description": "halogenated still bottoms and reaction residues"
},
{
    "code": "07 02 08*",
    "description": "other still bottoms and reaction residues"
},
{
    "code": "07 02 09*",
    "description": "halogenated filter cakes and spent absorbents"
},
{
    "code": "07 02 10*",
    "description": "other filter cakes and spent absorbents"
},
{
    "code": "07 02 11*",
    "description": "sludges from on-site effluent treatment containing hazardous substances"
},
{
    "code": "07 02 12",
    "description": "sludges from on-site effluent treatment other than those mentioned in 07 02 11"
},
{
    "code": "07 02 13",
    "description": "waste plastic"
},
{
    "code": "07 02 14*",
    "description": "wastes from additives containing hazardous substances"
},
{
    "code": "07 02 15",
    "description": "wastes from additives other than those mentioned in 07 02 14"
},
{
    "code": "07 02 16*",
    "description": "waste containing hazardous silicones"
},
{
    "code": "07 02 17",
    "description": "waste containing silicones other than those mentioned in 07 02 16"
},
{
    "code": "07 02 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "07 03 01*",
    "description": "aqueous washing liquids and mother liquors"
},
{
    "code": "07 03 03*",
    "description": "organic halogenated solvents, washing liquids and mother liquors"
},
{
    "code": "07 03 04*",
    "description": "other organic solvents, washing liquids and mother liquors"
},
{
    "code": "07 03 07*",
    "description": "halogenated still bottoms and reaction residues"
},
{
    "code": "07 03 08*",
    "description": "other still bottoms and reaction residues"
},
{
    "code": "07 03 09*",
    "description": "halogenated filter cakes and spent absorbents"
},
{
    "code": "07 03 10*",
    "description": "other filter cakes and spent absorbents"
},
{
    "code": "07 03 11*",
    "description": "sludges from on-site effluent treatment containing hazardous substances"
},
{
    "code": "07 03 12",
    "description": "sludges from on-site effluent treatment other than those mentioned in 07 03 11"
},
{
    "code": "07 03 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "07 04 01*",
    "description": "aqueous washing liquids and mother liquors"
},
{
    "code": "07 04 03*",
    "description": "organic halogenated solvents, washing liquids and mother liquors"
},
{
    "code": "07 04 04*",
    "description": "other organic solvents, washing liquids and mother liquors"
},
{
    "code": "07 04 07*",
    "description": "halogenated still bottoms and reaction residues"
},
{
    "code": "07 04 08*",
    "description": "other still bottoms and reaction residues"
},
{
    "code": "07 04 09*",
    "description": "halogenated filter cakes and spent absorbents"
},
{
    "code": "07 04 10*",
    "description": "other filter cakes and spent absorbents"
},
{
    "code": "07 04 11*",
    "description": "sludges from on-site effluent treatment containing hazardous substances"
},
{
    "code": "07 04 12",
    "description": "sludges from on-site effluent treatment other than those mentioned in 07 04 11"
},
{
    "code": "07 04 13*",
    "description": "solid wastes containing hazardous substances"
},
{
    "code": "07 04 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "07 05 01*",
    "description": "aqueous washing liquids and mother liquors"
},
{
    "code": "07 05 03*",
    "description": "organic halogenated solvents, washing liquids and mother liquors"
},
{
    "code": "07 05 04*",
    "description": "other organic solvents, washing liquids and mother liquors"
},
{
    "code": "07 05 07*",
    "description": "halogenated still bottoms and reaction residues"
},
{
    "code": "07 05 08*",
    "description": "other still bottoms and reaction residues"
},
{
    "code": "07 05 09*",
    "description": "halogenated filter cakes and spent absorbents"
},
{
    "code": "07 05 10*",
    "description": "other filter cakes and spent absorbents"
},
{
    "code": "07 05 11*",
    "description": "sludges from on-site effluent treatment containing hazardous substances"
},
{
    "code": "07 05 12",
    "description": "sludges from on-site effluent treatment other than those mentioned in 07 05 11"
},
{
    "code": "07 05 13*",
    "description": "solid wastes containing hazardous substances"
},
{
    "code": "07 05 14",
    "description": "solid wastes other than those mentioned in 07 05 13"
},
{
    "code": "07 05 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "07 06 01*",
    "description": "aqueous washing liquids and mother liquors"
},
{
    "code": "07 06 03*",
    "description": "organic halogenated solvents, washing liquids and mother liquors"
},
{
    "code": "07 06 04*",
    "description": "other organic solvents, washing liquids and mother liquors"
},
{
    "code": "07 06 07*",
    "description": "halogenated still bottoms and reaction residues"
},
{
    "code": "07 06 08*",
    "description": "other still bottoms and reaction residues"
},
{
    "code": "07 06 09*",
    "description": "halogenated filter cakes and spent absorbents"
},
{
    "code": "07 06 10*",
    "description": "other filter cakes and spent absorbents"
},
{
    "code": "07 06 11*",
    "description": "sludges from on-site effluent treatment containing hazardous substances"
},
{
    "code": "07 06 12",
    "description": "sludges from on-site effluent treatment other than those mentioned in 07 06 11"
},
{
    "code": "07 06 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "07 07 01*",
    "description": "aqueous washing liquids and mother liquors"
},
{
    "code": "07 07 03*",
    "description": "organic halogenated solvents, washing liquids and mother liquors"
},
{
    "code": "07 07 04*",
    "description": "other organic solvents, washing liquids and mother liquors"
},
{
    "code": "07 07 07*",
    "description": "halogenated still bottoms and reaction residues"
},
{
    "code": "07 07 08*",
    "description": "other still bottoms and reaction residues"
},
{
    "code": "07 07 09*",
    "description": "halogenated filter cakes and spent absorbents"
},
{
    "code": "07 07 10*",
    "description": "other filter cakes and spent absorbents"
},
{
    "code": "07 07 11*",
    "description": "sludges from on-site effluent treatment containing hazardous substances"
},
{
    "code": "07 07 12",
    "description": "sludges from on-site effluent treatment other than those mentioned in 07 07 11"
},
{
    "code": "07 07 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "08 01 11*",
    "description": "waste paint and varnish containing organic solvents or other hazardous substances"
},
{
    "code": "08 01 12",
    "description": "waste paint and varnish other than those mentioned in 08 01 11"
},
{
    "code": "08 01 13*",
    "description": "sludges from paint or varnish containing organic solvents or other hazardous substances"
},
{
    "code": "08 01 14",
    "description": "sludges from paint or varnish other than those mentioned in 08 01 13"
},
{
    "code": "08 01 15*",
    "description": "aqueous sludges containing paint or varnish containing organic solvents or other hazardous substances"
},
{
    "code": "08 01 16",
    "description": "aqueous sludges containing paint or varnish other than those mentioned in 08 01 15"
},
{
    "code": "08 01 17*",
    "description": "wastes from paint or varnish removal containing organic solvents or other hazardous substances"
},
{
    "code": "08 01 18",
    "description": "wastes from paint or varnish removal other than those mentioned in 08 01 17"
},
{
    "code": "08 01 19*",
    "description": "aqueous suspensions containing paint or varnish containing organic solvents or other hazardous substances"
},
{
    "code": "08 01 20",
    "description": "aqueous suspensions containing paint or varnish other than those mentioned in 08 01 19"
},
{
    "code": "08 01 21*",
    "description": "waste paint or varnish remover"
},
{
    "code": "08 01 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "08 02 01",
    "description": "waste coating powders"
},
{
    "code": "08 02 02",
    "description": "aqueous sludges containing ceramic materials"
},
{
    "code": "08 02 03",
    "description": "aqueous suspensions containing ceramic materials"
},
{
    "code": "08 02 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "08 03 07",
    "description": "aqueous sludges containing ink"
},
{
    "code": "08 03 08",
    "description": "aqueous liquid waste containing ink"
},
{
    "code": "08 03 12*",
    "description": "waste ink containing hazardous substances"
},
{
    "code": "08 03 13",
    "description": "waste ink other than those mentioned in 08 03 12"
},
{
    "code": "08 03 14*",
    "description": "ink sludges containing hazardous substances"
},
{
    "code": "08 03 15",
    "description": "ink sludges other than those mentioned in 08 03 14"
},
{
    "code": "08 03 16*",
    "description": "waste etching solutions"
},
{
    "code": "08 03 17*",
    "description": "waste printing toner containing hazardous substances"
},
{
    "code": "08 03 18",
    "description": "waste printing toner other than those mentioned in 08 03 17"
},
{
    "code": "08 03 19*",
    "description": "disperse oil"
},
{
    "code": "08 03 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "08 04 09*",
    "description": "waste adhesives and sealants containing organic solvents or other hazardous substances"
},
{
    "code": "08 04 10",
    "description": "waste adhesives and sealants other than those mentioned in 08 04 09"
},
{
    "code": "08 04 11*",
    "description": "adhesive and sealant sludges containing organic solvents or other hazardous substances"
},
{
    "code": "08 04 12",
    "description": "adhesive and sealant sludges other than those mentioned in 08 04 11"
},
{
    "code": "08 04 13*",
    "description": "aqueous sludges containing adhesives or sealants containing organic solvents or other hazardous substances"
},
{
    "code": "08 04 14",
    "description": "aqueous sludges containing adhesives or sealants other than those mentioned in 08 04 13"
},
{
    "code": "08 04 15*",
    "description": "aqueous liquid waste containing adhesives or sealants containing organic solvents or other hazardous substances"
},
{
    "code": "08 04 16",
    "description": "aqueous liquid waste containing adhesives or sealants other than those mentioned in 08 04 15"
},
{
    "code": "08 04 17*",
    "description": "rosin oil"
},
{
    "code": "08 04 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "08 05 01*",
    "description": "waste isocyanates"
},
{
    "code": "09 01 01*",
    "description": "water-based developer and activator solutions"
},
{
    "code": "09 01 02*",
    "description": "water-based offset plate developer solutions"
},
{
    "code": "09 01 03*",
    "description": "solvent-based developer solutions"
},
{
    "code": "09 01 04*",
    "description": "fixer solutions"
},
{
    "code": "09 01 05*",
    "description": "bleach solutions and bleach fixer solutions"
},
{
    "code": "09 01 06*",
    "description": "wastes containing silver from on-site treatment of photographic wastes"
},
{
    "code": "09 01 07",
    "description": "photographic film and paper containing silver or silver compounds"
},
{
    "code": "09 01 08",
    "description": "photographic film and paper free of silver or silver compounds"
},
{
    "code": "09 01 10",
    "description": "single-use cameras without batteries"
},
{
    "code": "09 01 11*",
    "description": "single-use cameras containing batteries included in 16 06 01, 16 06 02 or 16 06 03"
},
{
    "code": "09 01 12",
    "description": "single-use cameras containing batteries other than those mentioned in 09 01 11"
},
{
    "code": "09 01 13*",
    "description": "aqueous liquid waste from on-site reclamation of silver other than those mentioned in 09 01 06"
},
{
    "code": "09 01 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "10 01 01",
    "description": "bottom ash, slag and boiler dust (excluding boiler dust mentioned in 10 01 04)"
},
{
    "code": "10 01 02",
    "description": "coal fly ash"
},
{
    "code": "10 01 03",
    "description": "fly ash from peat and untreated wood"
},
{
    "code": "10 01 04*",
    "description": "oil fly ash and boiler dust"
},
{
    "code": "10 01 05",
    "description": "calcium-based reaction wastes from flue-gas desulphurisation in solid form"
},
{
    "code": "10 01 07",
    "description": "calcium-based reaction wastes from flue-gas desulphurisation in sludge form"
},
{
    "code": "10 01 09*",
    "description": "sulphuric acid"
},
{
    "code": "10 01 13*",
    "description": "fly ash from emulsified hydrocarbons used as fuel"
},
{
    "code": "10 01 14*",
    "description": "bottom ash, slag and boiler dust from co-incineration containing hazardous substances"
},
{
    "code": "10 01 15",
    "description": "bottom ash, slag and boiler dust from co-incineration other than those mentioned in 10 01 14"
},
{
    "code": "10 01 16*",
    "description": "fly ash from co-incineration containing hazardous substances"
},
{
    "code": "10 01 17",
    "description": "fly ash from co-incineration other than those mentioned in 10 01 16"
},
{
    "code": "10 01 18*",
    "description": "wastes from gas cleaning containing hazardous substances"
},
{
    "code": "10 01 19",
    "description": "wastes from gas cleaning other than those mentioned in 10 01 05, 10 01 07 and 10 01 18"
},
{
    "code": "10 01 20*",
    "description": "sludges from on-site effluent treatment containing hazardous substances"
},
{
    "code": "10 01 21",
    "description": "sludges from on-site effluent treatment other than those mentioned in 10 01 20"
},
{
    "code": "10 01 22*",
    "description": "aqueous sludges from boiler cleansing containing hazardous substances"
},
{
    "code": "10 01 23",
    "description": "aqueous sludges from boiler cleansing other than those mentioned in 10 01 22"
},
{
    "code": "10 01 24",
    "description": "sands from fluidised beds"
},
{
    "code": "10 01 25",
    "description": "wastes from fuel storage and preparation of coal-fired power plants"
},
{
    "code": "10 01 26",
    "description": "wastes from cooling-water treatment"
},
{
    "code": "10 01 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "10 02 01",
    "description": "wastes from the processing of slag"
},
{
    "code": "10 02 02",
    "description": "unprocessed slag"
},
{
    "code": "10 02 07*",
    "description": "solid wastes from gas treatment containing hazardous substances"
},
{
    "code": "10 02 08",
    "description": "solid wastes from gas treatment other than those mentioned in 10 02 07"
},
{
    "code": "10 02 10",
    "description": "mill scales"
},
{
    "code": "10 02 11*",
    "description": "wastes from cooling-water treatment containing oil"
},
{
    "code": "10 02 12",
    "description": "wastes from cooling-water treatment other than those mentioned in 10 02 11"
},
{
    "code": "10 02 13*",
    "description": "sludges and filter cakes from gas treatment containing hazardous substances"
},
{
    "code": "10 02 14",
    "description": "sludges and filter cakes from gas treatment other than those mentioned in 10 02 13"
},
{
    "code": "10 02 15",
    "description": "other sludges and filter cakes"
},
{
    "code": "10 02 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "10 03 02",
    "description": "anode scraps"
},
{
    "code": "10 03 04*",
    "description": "primary production slags"
},
{
    "code": "10 03 05",
    "description": "waste alumina"
},
{
    "code": "10 03 08*",
    "description": "salt slags from secondary production"
},
{
    "code": "10 03 09*",
    "description": "black drosses from secondary production"
},
{
    "code": "10 03 15*",
    "description": "skimmings that are flammable or emit, upon contact with water, flammable gases in hazardous quantities"
},
{
    "code": "10 03 16",
    "description": "skimmings other than those mentioned in 10 03 15"
},
{
    "code": "10 03 17*",
    "description": "tar-containing wastes from anode manufacture"
},
{
    "code": "10 03 18",
    "description": "carbon-containing wastes from anode manufacture other than those mentioned in 10 03 17"
},
{
    "code": "10 03 19*",
    "description": "flue-gas dust containing hazardous substances"
},
{
    "code": "10 03 20",
    "description": "flue-gas dust other than those mentioned in 10 03 19"
},
{
    "code": "10 03 21*",
    "description": "other particulates and dust (including ball-mill dust) containing hazardous substances"
},
{
    "code": "10 03 22",
    "description": "other particulates and dust (including ball-mill dust) other than those mentioned in 10 03 21"
},
{
    "code": "10 03 23*",
    "description": "solid wastes from gas treatment containing hazardous substances"
},
{
    "code": "10 03 24",
    "description": "solid wastes from gas treatment other than those mentioned in 10 03 23"
},
{
    "code": "10 03 25*",
    "description": "sludges and filter cakes from gas treatment containing hazardous substances"
},
{
    "code": "10 03 26",
    "description": "sludges and filter cakes from gas treatment other than those mentioned in 10 03 25"
},
{
    "code": "10 03 27*",
    "description": "wastes from cooling-water treatment containing oil"
},
{
    "code": "10 03 28",
    "description": "wastes from cooling-water treatment other than those mentioned in 10 03 27"
},
{
    "code": "10 03 29*",
    "description": "wastes from treatment of salt slags and black drosses containing hazardous substances"
},
{
    "code": "10 03 30",
    "description": "wastes from treatment of salt slags and black drosses other than those mentioned in 10 03 29"
},
{
    "code": "10 03 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "10 04 01*",
    "description": "slags from primary and secondary production"
},
{
    "code": "10 04 02*",
    "description": "dross and skimmings from primary and secondary production"
},
{
    "code": "10 04 03*",
    "description": "calcium arsenate"
},
{
    "code": "10 04 04*",
    "description": "flue-gas dust"
},
{
    "code": "10 04 05*",
    "description": "other particulates and dust"
},
{
    "code": "10 04 06*",
    "description": "solid wastes from gas treatment"
},
{
    "code": "10 04 07*",
    "description": "sludges and filter cakes from gas treatment"
},
{
    "code": "10 04 09*",
    "description": "wastes from cooling-water treatment containing oil"
},
{
    "code": "10 04 10",
    "description": "wastes from cooling-water treatment other than those mentioned in 10 04 09"
},
{
    "code": "10 04 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "10 05 01",
    "description": "slags from primary and secondary production"
},
{
    "code": "10 05 03*",
    "description": "flue-gas dust"
},
{
    "code": "10 05 04",
    "description": "other particulates and dust"
},
{
    "code": "10 05 05*",
    "description": "solid waste from gas treatment"
},
{
    "code": "10 05 06*",
    "description": "sludges and filter cakes from gas treatment"
},
{
    "code": "10 05 08*",
    "description": "wastes from cooling-water treatment containing oil"
},
{
    "code": "10 05 09",
    "description": "wastes from cooling-water treatment other than those mentioned in 10 05 08"
},
{
    "code": "10 05 10*",
    "description": "dross and skimmings that are flammable or emit, upon contact with water, flammable gases in hazardous quantities"
},
{
    "code": "10 05 11",
    "description": "dross and skimmings other than those mentioned in 10 05 10"
},
{
    "code": "10 05 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "10 06 01",
    "description": "slags from primary and secondary production"
},
{
    "code": "10 06 02",
    "description": "dross and skimmings from primary and secondary production"
},
{
    "code": "10 06 03*",
    "description": "flue-gas dust"
},
{
    "code": "10 06 04",
    "description": "other particulates and dust"
},
{
    "code": "10 06 06*",
    "description": "solid wastes from gas treatment"
},
{
    "code": "10 06 07*",
    "description": "sludges and filter cakes from gas treatment"
},
{
    "code": "10 06 09*",
    "description": "wastes from cooling-water treatment containing oil"
},
{
    "code": "10 06 10",
    "description": "wastes from cooling-water treatment other than those mentioned in 10 06 09"
},
{
    "code": "10 06 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "10 07 01",
    "description": "slags from primary and secondary production"
},
{
    "code": "10 07 02",
    "description": "dross and skimmings from primary and secondary production"
},
{
    "code": "10 07 03",
    "description": "solid wastes from gas treatment"
},
{
    "code": "10 07 04",
    "description": "other particulates and dust"
},
{
    "code": "10 07 05",
    "description": "sludges and filter cakes from gas treatment"
},
{
    "code": "10 07 07*",
    "description": "wastes from cooling-water treatment containing oil"
},
{
    "code": "10 07 08",
    "description": "wastes from cooling-water treatment other than those mentioned in 10 07 07"
},
{
    "code": "10 07 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "10 08 04",
    "description": "particulates and dust"
},
{
    "code": "10 08 08*",
    "description": "salt slag from primary and secondary production"
},
{
    "code": "10 08 09",
    "description": "other slags"
},
{
    "code": "10 08 10*",
    "description": "dross and skimmings that are flammable or emit, upon contact with water, flammable gases in hazardous quantities"
},
{
    "code": "10 08 11",
    "description": "dross and skimmings other than those mentioned in 10 08 10"
},
{
    "code": "10 08 12*",
    "description": "tar-containing wastes from anode manufacture"
},
{
    "code": "10 08 13",
    "description": "carbon-containing wastes from anode manufacture other than those mentioned in 10 08 12"
},
{
    "code": "10 08 14",
    "description": "anode scrap"
},
{
    "code": "10 08 15*",
    "description": "flue-gas dust containing hazardous substances"
},
{
    "code": "10 08 16",
    "description": "flue-gas dust other than those mentioned in 10 08 15"
},
{
    "code": "10 08 17*",
    "description": "sludges and filter cakes from flue-gas treatment containing hazardous substances"
},
{
    "code": "10 08 18",
    "description": "sludges and filter cakes from flue-gas treatment other than those mentioned in 10 08 17"
},
{
    "code": "10 08 19*",
    "description": "wastes from cooling-water treatment containing oil"
},
{
    "code": "10 08 20",
    "description": "wastes from cooling-water treatment other than those mentioned in 10 08 19"
},
{
    "code": "10 08 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "10 09 03",
    "description": "furnace slag"
},
{
    "code": "10 09 05*",
    "description": "casting cores and moulds which have not undergone pouring containing hazardous substances"
},
{
    "code": "10 09 06",
    "description": "casting cores and moulds which have not undergone pouring other than those mentioned in 10 09 05"
},
{
    "code": "10 09 07*",
    "description": "casting cores and moulds which have undergone pouring containing hazardous substances"
},
{
    "code": "10 09 08",
    "description": "casting cores and moulds which have undergone pouring other than those mentioned in 10 09 07"
},
{
    "code": "10 09 09*",
    "description": "flue-gas dust containing hazardous substances"
},
{
    "code": "10 09 10",
    "description": "flue-gas dust other than those mentioned in 10 09 09"
},
{
    "code": "10 09 11*",
    "description": "other particulates containing hazardous substances"
},
{
    "code": "10 09 12",
    "description": "other particulates other than those mentioned in 10 09 11"
},
{
    "code": "10 09 13*",
    "description": "waste binders containing hazardous substances"
},
{
    "code": "10 09 14",
    "description": "waste binders other than those mentioned in 10 09 13"
},
{
    "code": "10 09 15*",
    "description": "waste crack-indicating agent containing hazardous substances"
},
{
    "code": "10 09 16",
    "description": "waste crack-indicating agent other than those mentioned in 10 09 15"
},
{
    "code": "10 09 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "10 10 03",
    "description": "furnace slag"
},
{
    "code": "10 10 05*",
    "description": "casting cores and moulds which have not undergone pouring, containing hazardous substances"
},
{
    "code": "10 10 06",
    "description": "casting cores and moulds which have not undergone pouring, other than those mentioned in 10 10 05"
},
{
    "code": "10 10 07*",
    "description": "casting cores and moulds which have undergone pouring, containing hazardous substances"
},
{
    "code": "10 10 08",
    "description": "casting cores and moulds which have undergone pouring, other than those mentioned in 10 10 07"
},
{
    "code": "10 10 09*",
    "description": "flue-gas dust containing hazardous substances"
},
{
    "code": "10 10 10",
    "description": "flue-gas dust other than those mentioned in 10 10 09"
},
{
    "code": "10 10 11*",
    "description": "other particulates containing hazardous substances"
},
{
    "code": "10 10 12",
    "description": "other particulates other than those mentioned in 10 10 11"
},
{
    "code": "10 10 13*",
    "description": "waste binders containing hazardous substances"
},
{
    "code": "10 10 14",
    "description": "waste binders other than those mentioned in 10 10 13"
},
{
    "code": "10 10 15*",
    "description": "waste crack-indicating agent containing hazardous substances"
},
{
    "code": "10 10 16",
    "description": "waste crack-indicating agent other than those mentioned in 10 10 15"
},
{
    "code": "10 10 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "10 11 03",
    "description": "waste glass-based fibrous materials"
},
{
    "code": "10 11 05",
    "description": "particulates and dust"
},
{
    "code": "10 11 09*",
    "description": "waste preparation mixture before thermal processing, containing hazardous substances"
},
{
    "code": "10 11 10",
    "description": "waste preparation mixture before thermal processing, other than those mentioned in 10 11 09"
},
{
    "code": "10 11 11*",
    "description": "waste glass in small particles and glass powder containing heavy metals (for example from cathode ray tubes)"
},
{
    "code": "10 11 12",
    "description": "waste glass other than those mentioned in 10 11 11"
},
{
    "code": "10 11 13*",
    "description": "glass-polishing and -grinding sludge containing hazardous substances"
},
{
    "code": "10 11 14",
    "description": "glass-polishing and -grinding sludge other than those mentioned in 10 11 13"
},
{
    "code": "10 11 15*",
    "description": "solid wastes from flue-gas treatment containing hazardous substances"
},
{
    "code": "10 11 16",
    "description": "solid wastes from flue-gas treatment other than those mentioned in 10 11 15"
},
{
    "code": "10 11 17*",
    "description": "sludges and filter cakes from flue-gas treatment containing hazardous substances"
},
{
    "code": "10 11 18",
    "description": "sludges and filter cakes from flue-gas treatment other than those mentioned in 10 11 17"
},
{
    "code": "10 11 19*",
    "description": "solid wastes from on-site effluent treatment containing hazardous substances"
},
{
    "code": "10 11 20",
    "description": "solid wastes from on-site effluent treatment other than those mentioned in 10 11 19"
},
{
    "code": "10 11 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "10 12 01",
    "description": "waste preparation mixture before thermal processing"
},
{
    "code": "10 12 03",
    "description": "particulates and dust"
},
{
    "code": "10 12 05",
    "description": "sludges and filter cakes from gas treatment"
},
{
    "code": "10 12 06",
    "description": "discarded moulds"
},
{
    "code": "10 12 08",
    "description": "waste ceramics, bricks, tiles and construction products (after thermal processing)"
},
{
    "code": "10 12 09*",
    "description": "solid wastes from gas treatment containing hazardous substances"
},
{
    "code": "10 12 10",
    "description": "solid wastes from gas treatment other than those mentioned in 10 12 09"
},
{
    "code": "10 12 11*",
    "description": "wastes from glazing containing heavy metals"
},
{
    "code": "10 12 12",
    "description": "wastes from glazing other than those mentioned in 10 12 11"
},
{
    "code": "10 12 13",
    "description": "sludge from on-site effluent treatment"
},
{
    "code": "10 12 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "10 13 01",
    "description": "waste preparation mixture before thermal processing"
},
{
    "code": "10 13 04",
    "description": "wastes from calcination and hydration of lime"
},
{
    "code": "10 13 06",
    "description": "particulates and dust (except 10 13 12 and 10 13 13)"
},
{
    "code": "10 13 07",
    "description": "sludges and filter cakes from gas treatment"
},
{
    "code": "10 13 09*",
    "description": "wastes from asbestos-cement manufacture containing asbestos"
},
{
    "code": "10 13 10",
    "description": "wastes from asbestos-cement manufacture other than those mentioned in 10 13 09"
},
{
    "code": "10 13 11",
    "description": "wastes from cement-based composite materials other than those mentioned in 10 13 09 and 10 13 10"
},
{
    "code": "10 13 12*",
    "description": "solid wastes from gas treatment containing hazardous substances"
},
{
    "code": "10 13 13",
    "description": "solid wastes from gas treatment other than those mentioned in 10 13 12"
},
{
    "code": "10 13 14",
    "description": "waste concrete and concrete sludge"
},
{
    "code": "10 13 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "10 14 01*",
    "description": "waste from gas cleaning containing mercury"
},
{
    "code": "11 01 05*",
    "description": "pickling acids"
},
{
    "code": "11 01 06*",
    "description": "acids not otherwise specified"
},
{
    "code": "11 01 07*",
    "description": "pickling bases"
},
{
    "code": "11 01 08*",
    "description": "phosphatising sludges"
},
{
    "code": "11 01 09*",
    "description": "sludges and filter cakes containing hazardous substances"
},
{
    "code": "11 01 10",
    "description": "sludges and filter cakes other than those mentioned in 11 01 09"
},
{
    "code": "11 01 11*",
    "description": "aqueous rinsing liquids containing hazardous substances"
},
{
    "code": "11 01 12",
    "description": "aqueous rinsing liquids other than those mentioned in 11 01 11"
},
{
    "code": "11 01 13*",
    "description": "degreasing wastes containing hazardous substances"
},
{
    "code": "11 01 14",
    "description": "degreasing wastes other than those mentioned in 11 01 13"
},
{
    "code": "11 01 15*",
    "description": "eluate and sludges from membrane systems or ion exchange systems containing hazardous substances"
},
{
    "code": "11 01 16*",
    "description": "saturated or spent ion exchange resins"
},
{
    "code": "11 01 98*",
    "description": "other wastes containing hazardous substances"
},
{
    "code": "11 01 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "11 02 02*",
    "description": "sludges from zinc hydrometallurgy (including jarosite, goethite)"
},
{
    "code": "11 02 03",
    "description": "wastes from the production of anodes for aqueous electrolytical processes"
},
{
    "code": "11 02 05*",
    "description": "wastes from copper hydrometallurgical processes containing hazardous substances"
},
{
    "code": "11 02 06",
    "description": "wastes from copper hydrometallurgical processes other than those mentioned in 11 02 05"
},
{
    "code": "11 02 07*",
    "description": "other wastes containing hazardous substances"
},
{
    "code": "11 02 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "11 03 01*",
    "description": "wastes containing cyanide"
},
{
    "code": "11 03 02*",
    "description": "other wastes"
},
{
    "code": "11 05 01",
    "description": "hard zinc"
},
{
    "code": "11 05 02",
    "description": "zinc ash"
},
{
    "code": "11 05 03*",
    "description": "solid wastes from gas treatment"
},
{
    "code": "11 05 04*",
    "description": "spent flux"
},
{
    "code": "11 05 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "12 01 01",
    "description": "ferrous metal filings and turnings"
},
{
    "code": "12 01 02",
    "description": "ferrous metal dust and particles"
},
{
    "code": "12 01 03",
    "description": "non-ferrous metal filings and turnings"
},
{
    "code": "12 01 04",
    "description": "non-ferrous metal dust and particles"
},
{
    "code": "12 01 05",
    "description": "plastics shavings and turnings"
},
{
    "code": "12 01 06*",
    "description": "mineral-based machining oils containing halogens (except emulsions and solutions)"
},
{
    "code": "12 01 07*",
    "description": "mineral-based machining oils free of halogens (except emulsions and solutions)"
},
{
    "code": "12 01 08*",
    "description": "machining emulsions and solutions containing halogens"
},
{
    "code": "12 01 09*",
    "description": "machining emulsions and solutions free of halogens"
},
{
    "code": "12 01 10*",
    "description": "synthetic machining oils"
},
{
    "code": "12 01 12*",
    "description": "spent waxes and fats"
},
{
    "code": "12 01 13",
    "description": "welding wastes"
},
{
    "code": "12 01 14*",
    "description": "machining sludges containing hazardous substances"
},
{
    "code": "12 01 15",
    "description": "machining sludges other than those mentioned in 12 01 14"
},
{
    "code": "12 01 16*",
    "description": "waste blasting material containing hazardous substances"
},
{
    "code": "12 01 17",
    "description": "waste blasting material other than those mentioned in 12 01 16"
},
{
    "code": "12 01 18*",
    "description": "metal sludge (grinding, honing and lapping sludge) containing oil"
},
{
    "code": "12 01 19*",
    "description": "readily biodegradable machining oil"
},
{
    "code": "12 01 20*",
    "description": "spent grinding bodies and grinding materials containing hazardous substances"
},
{
    "code": "12 01 21",
    "description": "spent grinding bodies and grinding materials other than those mentioned in 12 01 20"
},
{
    "code": "12 01 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "12 03 01*",
    "description": "aqueous washing liquids"
},
{
    "code": "12 03 02*",
    "description": "steam degreasing wastes"
},
{
    "code": "13 01 01*",
    "description": "hydraulic oils, containing PCBs"
},
{
    "code": "13 01 04*",
    "description": "chlorinated emulsions"
},
{
    "code": "13 01 05*",
    "description": "non-chlorinated emulsions"
},
{
    "code": "13 01 09*",
    "description": "mineral-based chlorinated hydraulic oils"
},
{
    "code": "13 01 10*",
    "description": "mineral based non-chlorinated hydraulic oils"
},
{
    "code": "13 01 11*",
    "description": "synthetic hydraulic oils"
},
{
    "code": "13 01 12*",
    "description": "readily biodegradable hydraulic oils"
},
{
    "code": "13 01 13*",
    "description": "other hydraulic oils"
},
{
    "code": "13 02 04*",
    "description": "mineral-based chlorinated engine, gear and lubricating oils"
},
{
    "code": "13 02 05*",
    "description": "mineral-based non-chlorinated engine, gear and lubricating oils"
},
{
    "code": "13 02 06*",
    "description": "synthetic engine, gear and lubricating oils"
},
{
    "code": "13 02 07*",
    "description": "readily biodegradable engine, gear and lubricating oils"
},
{
    "code": "13 02 08*",
    "description": "other engine, gear and lubricating oils"
},
{
    "code": "13 03 01*",
    "description": "insulating or heat transmission oils containing PCBs"
},
{
    "code": "13 03 06*",
    "description": "mineral-based chlorinated insulating and heat transmission oils other than those mentioned in 13 03 01"
},
{
    "code": "13 03 07*",
    "description": "mineral-based non-chlorinated insulating and heat transmission oils"
},
{
    "code": "13 03 08*",
    "description": "synthetic insulating and heat transmission oils"
},
{
    "code": "13 03 09*",
    "description": "readily biodegradable insulating and heat transmission oils"
},
{
    "code": "13 03 10*",
    "description": "other insulating and heat transmission oils"
},
{
    "code": "13 04 01*",
    "description": "bilge oils from inland navigation"
},
{
    "code": "13 04 02*",
    "description": "bilge oils from jetty sewers"
},
{
    "code": "13 04 03*",
    "description": "bilge oils from other navigation"
},
{
    "code": "13 05 01*",
    "description": "solids from grit chambers and oil/water separators"
},
{
    "code": "13 05 02*",
    "description": "sludges from oil/water separators"
},
{
    "code": "13 05 03*",
    "description": "interceptor sludges"
},
{
    "code": "13 05 06*",
    "description": "oil from oil/water separators"
},
{
    "code": "13 05 07*",
    "description": "oily water from oil/water separators"
},
{
    "code": "13 05 08*",
    "description": "mixtures of wastes from grit chambers and oil/water separators"
},
{
    "code": "13 07 01*",
    "description": "fuel oil and diesel"
},
{
    "code": "13 07 02*",
    "description": "petrol"
},
{
    "code": "13 07 03*",
    "description": "other fuels (including mixtures)"
},
{
    "code": "13 08 01*",
    "description": "desalter sludges or emulsions"
},
{
    "code": "13 08 02*",
    "description": "other emulsions"
},
{
    "code": "13 08 99*",
    "description": "wastes not otherwise specified"
},
{
    "code": "14 06 01*",
    "description": "chlorofluorocarbons, HCFC, HFC"
},
{
    "code": "14 06 02*",
    "description": "other halogenated solvents and solvent mixtures"
},
{
    "code": "14 06 03*",
    "description": "other solvents and solvent mixtures"
},
{
    "code": "14 06 04*",
    "description": "sludges or solid wastes containing halogenated solvents"
},
{
    "code": "14 06 05*",
    "description": "sludges or solid wastes containing other solvents"
},
{
    "code": "15 01 01",
    "description": "paper and cardboard packaging"
},
{
    "code": "15 01 02",
    "description": "plastic packaging"
},
{
    "code": "15 01 03",
    "description": "wooden packaging"
},
{
    "code": "15 01 04",
    "description": "metallic packaging"
},
{
    "code": "15 01 05",
    "description": "composite packaging"
},
{
    "code": "15 01 06",
    "description": "mixed packaging"
},
{
    "code": "15 01 07",
    "description": "glass packaging"
},
{
    "code": "15 01 09",
    "description": "textile packaging"
},
{
    "code": "15 01 10*",
    "description": "packaging containing residues of or contaminated by hazardous substances"
},
{
    "code": "15 01 11*",
    "description": "metallic packaging containing a hazardous solid porous matrix (for example asbestos), including empty pressure containers"
},
{
    "code": "15 02 02*",
    "description": "absorbents, filter materials (including oil filters not otherwise specified), wiping cloths, protective clothing contaminated by hazardous substances"
},
{
    "code": "15 02 03",
    "description": "absorbents, filter materials, wiping cloths and protective clothing other than those mentioned in 15 02 02"
},
{
    "code": "16 01 03",
    "description": "end-of-life tyres"
},
{
    "code": "16 01 04*",
    "description": "end-of-life vehicles"
},
{
    "code": "16 01 06",
    "description": "end-of-life vehicles, containing neither liquids nor other hazardous components"
},
{
    "code": "16 01 07*",
    "description": "oil filters"
},
{
    "code": "16 01 08*",
    "description": "components containing mercury"
},
{
    "code": "16 01 09*",
    "description": "components containing PCBs"
},
{
    "code": "16 01 10*",
    "description": "explosive components (for example air bags)"
},
{
    "code": "16 01 11*",
    "description": "brake pads containing asbestos"
},
{
    "code": "16 01 12",
    "description": "brake pads other than those mentioned in 16 01 11"
},
{
    "code": "16 01 13*",
    "description": "brake fluids"
},
{
    "code": "16 01 14*",
    "description": "antifreeze fluids containing hazardous substances"
},
{
    "code": "16 01 15",
    "description": "antifreeze fluids other than those mentioned in 16 01 14"
},
{
    "code": "16 01 16",
    "description": "tanks for liquefied gas"
},
{
    "code": "16 01 17",
    "description": "ferrous metal"
},
{
    "code": "16 01 18",
    "description": "non-ferrous metal"
},
{
    "code": "16 01 19",
    "description": "plastic"
},
{
    "code": "16 01 20",
    "description": "glass"
},
{
    "code": "16 01 21*",
    "description": "hazardous components other than those mentioned in 16 01 07 to 16 01 11 and 16 01 13 and 16 01 14"
},
{
    "code": "16 01 22",
    "description": "components not otherwise specified"
},
{
    "code": "16 01 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "16 02 09*",
    "description": "transformers and capacitors containing PCBs"
},
{
    "code": "16 02 10*",
    "description": "discarded equipment containing or contaminated by PCBs other than those mentioned in 16 02 09"
},
{
    "code": "16 02 11*",
    "description": "discarded equipment containing chlorofluorocarbons, HCFC, HFC"
},
{
    "code": "16 02 12*",
    "description": "discarded equipment containing free asbestos"
},
{
    "code": "16 02 13*",
    "description": "discarded equipment containing hazardous componentsother than those mentioned in 16 02 09 to 16 02 12"
},
{
    "code": "16 02 14",
    "description": "discarded equipment other than those mentioned in 16 02 09 to 16 02 13"
},
{
    "code": "16 02 15*",
    "description": "hazardous components removed from discarded equipment"
},
{
    "code": "16 02 16",
    "description": "components removed from discarded equipment other than those mentioned in 16 02 15"
},
{
    "code": "16 03 03*",
    "description": "inorganic wastes containing hazardous substances"
},
{
    "code": "16 03 04",
    "description": "inorganic wastes other than those mentioned in 16 03 03"
},
{
    "code": "16 03 05*",
    "description": "organic wastes containing hazardous substances"
},
{
    "code": "16 03 06",
    "description": "organic wastes other than those mentioned in 16 03 05"
},
{
    "code": "16 03 07*",
    "description": "metallic mercury"
},
{
    "code": "16 04 01*",
    "description": "waste ammunition"
},
{
    "code": "16 04 02*",
    "description": "fireworks wastes"
},
{
    "code": "16 04 03*",
    "description": "other waste explosives"
},
{
    "code": "16 05 04*",
    "description": "gases in pressure containers (including halons) containing hazardous substances"
},
{
    "code": "16 05 05",
    "description": "gases in pressure containers other than those mentioned in 16 05 04"
},
{
    "code": "16 05 06*",
    "description": "laboratory chemicals, consisting of or containing hazardous substances, including mixtures of laboratory chemicals"
},
{
    "code": "16 05 07*",
    "description": "discarded inorganic chemicals consisting of or containing hazardous substances"
},
{
    "code": "16 05 08*",
    "description": "discarded organic chemicals consisting of or containing hazardous substances"
},
{
    "code": "16 05 09",
    "description": "discarded chemicals other than those mentioned in 16 05 06, 16 05 07 or 16 05 08"
},
{
    "code": "16 06 01*",
    "description": "lead batteries"
},
{
    "code": "16 06 02*",
    "description": "Ni-Cd batteries"
},
{
    "code": "16 06 03*",
    "description": "mercury-containing batteries"
},
{
    "code": "16 06 04",
    "description": "alkaline batteries (except 16 06 03)"
},
{
    "code": "16 06 05",
    "description": "other batteries and accumulators"
},
{
    "code": "16 06 06*",
    "description": "separately collected electrolyte from batteries and accumulators"
},
{
    "code": "16 07 08*",
    "description": "wastes containing oil"
},
{
    "code": "16 07 09*",
    "description": "wastes containing other hazardous substances"
},
{
    "code": "16 07 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "16 08 01",
    "description": "spent catalysts containing gold, silver, rhenium, rhodium, palladium, iridium or platinum (except 16 08 07)"
},
{
    "code": "16 08 02*",
    "description": "spent catalysts containing hazardous transition metals or hazardous transition metal compounds"
},
{
    "code": "16 08 03",
    "description": "spent catalysts containing transition metals or transition metal compounds not otherwise specified"
},
{
    "code": "16 08 04",
    "description": "spent fluid catalytic cracking catalysts (except 16 08 07)"
},
{
    "code": "16 08 05*",
    "description": "spent catalysts containing phosphoric acid"
},
{
    "code": "16 08 06*",
    "description": "spent liquids used as catalysts"
},
{
    "code": "16 08 07*",
    "description": "spent catalysts contaminated with hazardous substances"
},
{
    "code": "16 09 01*",
    "description": "permanganates, for example potassium permanganate"
},
{
    "code": "16 09 02*",
    "description": "chromates, for example potassium chromate, potassium or sodium dichromate"
},
{
    "code": "16 09 03*",
    "description": "peroxides, for example hydrogen peroxide"
},
{
    "code": "16 09 04*",
    "description": "oxidising substances, not otherwise specified"
},
{
    "code": "16 10 01*",
    "description": "aqueous liquid wastes containing hazardous substances"
},
{
    "code": "16 10 02",
    "description": "aqueous liquid wastes other than those mentioned in 16 10 01"
},
{
    "code": "16 10 03*",
    "description": "aqueous concentrates containing hazardous substances"
},
{
    "code": "16 10 04",
    "description": "aqueous concentrates other than those mentioned in 16 10 03"
},
{
    "code": "16 11 01*",
    "description": "carbon-based linings and refractories from metallurgical processes containing hazardous substances"
},
{
    "code": "16 11 02",
    "description": "carbon-based linings and refractories from metallurgical processes others than those mentioned in 16 11 01"
},
{
    "code": "16 11 03*",
    "description": "other linings and refractories from metallurgical processes containing hazardous substances"
},
{
    "code": "16 11 04",
    "description": "other linings and refractories from metallurgical processes other than those mentioned in 16 11 03"
},
{
    "code": "16 11 05*",
    "description": "linings and refractories from non-metallurgical processes containing hazardous substances"
},
{
    "code": "16 11 06",
    "description": "linings and refractories from non-metallurgical processes others than those mentioned in 16 11 05"
},
{
    "code": "17 01 01",
    "description": "concrete"
},
{
    "code": "17 01 02",
    "description": "bricks"
},
{
    "code": "17 01 03",
    "description": "tiles and ceramics"
},
{
    "code": "17 01 06*",
    "description": "mixtures of, or separate fractions of concrete, bricks, tiles and ceramics containing hazardous substances"
},
{
    "code": "17 01 07",
    "description": "mixtures of concrete, bricks, tiles and ceramics other than those mentioned in 17 01 06"
},
{
    "code": "17 02 01",
    "description": "wood"
},
{
    "code": "17 02 02",
    "description": "glass"
},
{
    "code": "17 02 03",
    "description": "plastic"
},
{
    "code": "17 02 04*",
    "description": "glass, plastic and wood containing or contaminated with hazardous substances"
},
{
    "code": "17 03 01*",
    "description": "bituminous mixtures containing coal tar"
},
{
    "code": "17 03 02",
    "description": "bituminous mixtures other than those mentioned in 17 03 01"
},
{
    "code": "17 03 03*",
    "description": "coal tar and tarred products"
},
{
    "code": "17 04 01",
    "description": "copper, bronze, brass"
},
{
    "code": "17 04 02",
    "description": "aluminium"
},
{
    "code": "17 04 03",
    "description": "lead"
},
{
    "code": "17 04 04",
    "description": "zinc"
},
{
    "code": "17 04 05",
    "description": "iron and steel"
},
{
    "code": "17 04 06",
    "description": "tin"
},
{
    "code": "17 04 07",
    "description": "mixed metals"
},
{
    "code": "17 04 09*",
    "description": "metal waste contaminated with hazardous substances"
},
{
    "code": "17 04 10*",
    "description": "cables containing oil, coal tar and other hazardous substances"
},
{
    "code": "17 04 11",
    "description": "cables other than those mentioned in 17 04 10"
},
{
    "code": "17 05 03*",
    "description": "soil and stones containing hazardous substances"
},
{
    "code": "17 05 04",
    "description": "soil and stones other than those mentioned in 17 05 03"
},
{
    "code": "17 05 05*",
    "description": "dredging spoil containing hazardous substances"
},
{
    "code": "17 05 06",
    "description": "dredging spoil other than those mentioned in 17 05 05"
},
{
    "code": "17 05 07*",
    "description": "track ballast containing hazardous substances"
},
{
    "code": "17 05 08",
    "description": "track ballast other than those mentioned in 17 05 07"
},
{
    "code": "17 06 01*",
    "description": "insulation materials containing asbestos"
},
{
    "code": "17 06 03*",
    "description": "other insulation materials consisting of or containing hazardous substances"
},
{
    "code": "17 06 04",
    "description": "insulation materials other than those mentioned in 17 06 01 and 17 06 03"
},
{
    "code": "17 06 05*",
    "description": "construction materials containing asbestos"
},
{
    "code": "17 08 01*",
    "description": "gypsum-based construction materials contaminated with hazardous substances"
},
{
    "code": "17 08 02",
    "description": "gypsum-based construction materials other than those mentioned in 17 08 01"
},
{
    "code": "17 09 01*",
    "description": "construction and demolition wastes containing mercury"
},
{
    "code": "17 09 02*",
    "description": "construction and demolition wastes containing PCB (for example PCB- containing sealants, PCB-containing resin-based floorings, PCB-containing sealed glazing units, PCB-containing capacitors)"
},
{
    "code": "17 09 03*",
    "description": "other construction and demolition wastes (including mixed wastes) containing hazardous substances"
},
{
    "code": "17 09 04",
    "description": "mixed construction and demolition wastes other than those mentioned in 17 09 01, 17 09 02 and 17 09 03"
},
{
    "code": "18 01 01",
    "description": "sharps (except 18 01 03)"
},
{
    "code": "18 01 02",
    "description": "body parts and organs including blood bags and blood preserves (except 18 01 03)"
},
{
    "code": "18 01 03*",
    "description": "wastes whose collection and disposal is subject to special requirements in order to prevent infection"
},
{
    "code": "18 01 04",
    "description": "wastes whose collection and disposal is not subject to special requirements in order to prevent infection (for example dressings, plaster casts, linen, disposable clothing, diapers)"
},
{
    "code": "18 01 06*",
    "description": "chemicals consisting of or containing hazardous substances"
},
{
    "code": "18 01 07",
    "description": "chemicals other than those mentioned in 18 01 06"
},
{
    "code": "18 01 08*",
    "description": "cytotoxic and cytostatic medicines"
},
{
    "code": "18 01 09",
    "description": "medicines other than those mentioned in 18 01 08"
},
{
    "code": "18 01 10*",
    "description": "amalgam waste from dental care"
},
{
    "code": "18 02 01",
    "description": "sharps (except 18 02 02)"
},
{
    "code": "18 02 02*",
    "description": "wastes whose collection and disposal is subject to special requirements in order to prevent infection"
},
{
    "code": "18 02 03",
    "description": "wastes whose collection and disposal is not subject to special requirements in order to prevent infection"
},
{
    "code": "18 02 05*",
    "description": "chemicals consisting of or containing hazardous substances"
},
{
    "code": "18 02 06",
    "description": "chemicals other than those mentioned in 18 02 05"
},
{
    "code": "18 02 07*",
    "description": "cytotoxic and cytostatic medicines"
},
{
    "code": "18 02 08",
    "description": "medicines other than those mentioned in 18 02 07"
},
{
    "code": "19 01 02",
    "description": "ferrous materials removed from bottom ash"
},
{
    "code": "19 01 05*",
    "description": "filter cake from gas treatment"
},
{
    "code": "19 01 06*",
    "description": "aqueous liquid wastes from gas treatment and other aqueous liquid wastes"
},
{
    "code": "19 01 07*",
    "description": "solid wastes from gas treatment"
},
{
    "code": "19 01 10*",
    "description": "spent activated carbon from flue-gas treatment"
},
{
    "code": "19 01 11*",
    "description": "bottom ash and slag containing hazardous substances"
},
{
    "code": "19 01 12",
    "description": "bottom ash and slag other than those mentioned in 19 01 11"
},
{
    "code": "19 01 13*",
    "description": "fly ash containing hazardous substances"
},
{
    "code": "19 01 14",
    "description": "fly ash other than those mentioned in 19 01 13"
},
{
    "code": "19 01 15*",
    "description": "boiler dust containing hazardous substances"
},
{
    "code": "19 01 16",
    "description": "boiler dust other than those mentioned in 19 01 15"
},
{
    "code": "19 01 17*",
    "description": "pyrolysis wastes containing hazardous substances"
},
{
    "code": "19 01 18",
    "description": "pyrolysis wastes other than those mentioned in 19 01 17"
},
{
    "code": "19 01 19",
    "description": "sands from fluidised beds"
},
{
    "code": "19 01 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "19 02 03",
    "description": "premixed wastes composed only of non-hazardous wastes"
},
{
    "code": "19 02 04*",
    "description": "premixed wastes composed of at least one hazardous waste"
},
{
    "code": "19 02 05*",
    "description": "sludges from physico/chemical treatment containing hazardous substances"
},
{
    "code": "19 02 06",
    "description": "sludges from physico/chemical treatment other than those mentioned in 19 02 05"
},
{
    "code": "19 02 07*",
    "description": "oil and concentrates from separation"
},
{
    "code": "19 02 08*",
    "description": "liquid combustible wastes containing hazardous substances"
},
{
    "code": "19 02 09*",
    "description": "solid combustible wastes containing hazardous substances"
},
{
    "code": "19 02 10",
    "description": "combustible wastes other than those mentioned in 19 02 08 and 19 02 09"
},
{
    "code": "19 02 11*",
    "description": "other wastes containing hazardous substances"
},
{
    "code": "19 02 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "19 03 04*",
    "description": "wastes marked as hazardous, partly stabilised other than 19 03 08"
},
{
    "code": "19 03 05",
    "description": "stabilised wastes other than those mentioned in 19 03 04"
},
{
    "code": "19 03 06*",
    "description": "wastes marked as hazardous, solidified"
},
{
    "code": "19 03 07",
    "description": "solidified wastes other than those mentioned in 19 03 06"
},
{
    "code": "19 03 08*",
    "description": "partly stabilised mercury"
},
{
    "code": "19 04 01",
    "description": "vitrified waste"
},
{
    "code": "19 04 02*",
    "description": "fly ash and other flue-gas treatment wastes"
},
{
    "code": "19 04 03*",
    "description": "non-vitrified solid phase"
},
{
    "code": "19 04 04",
    "description": "aqueous liquid wastes from vitrified waste tempering"
},
{
    "code": "19 05 01",
    "description": "non-composted fraction of municipal and similar wastes"
},
{
    "code": "19 05 02",
    "description": "non-composted fraction of animal and vegetable waste"
},
{
    "code": "19 05 03",
    "description": "off-specification compost"
},
{
    "code": "19 05 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "19 06 03",
    "description": "liquor from anaerobic treatment of municipal waste"
},
{
    "code": "19 06 04",
    "description": "digestate from anaerobic treatment of municipal waste"
},
{
    "code": "19 06 05",
    "description": "liquor from anaerobic treatment of animal and vegetable waste"
},
{
    "code": "19 06 06",
    "description": "digestate from anaerobic treatment of animal and vegetable waste"
},
{
    "code": "19 06 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "19 07 02*",
    "description": "landfill leachate containing hazardous substances"
},
{
    "code": "19 07 03",
    "description": "landfill leachate other than those mentioned in 19 07 02"
},
{
    "code": "19 08 01",
    "description": "screenings"
},
{
    "code": "19 08 02",
    "description": "waste from desanding"
},
{
    "code": "19 08 05",
    "description": "sludges from treatment of urban waste water"
},
{
    "code": "19 08 06*",
    "description": "saturated or spent ion exchange resins"
},
{
    "code": "19 08 07*",
    "description": "solutions and sludges from regeneration of ion exchangers"
},
{
    "code": "19 08 08*",
    "description": "membrane system waste containing heavy metals"
},
{
    "code": "19 08 09",
    "description": "grease and oil mixture from oil/water separation containing only edible oil and fats"
},
{
    "code": "19 08 10*",
    "description": "grease and oil mixture from oil/water separation other than those mentioned in 19 08 09"
},
{
    "code": "19 08 11*",
    "description": "sludges containing hazardous substances from biological treatment of industrial waste water"
},
{
    "code": "19 08 12",
    "description": "sludges from biological treatment of industrial waste water other than those mentioned in 19 08 11"
},
{
    "code": "19 08 13*",
    "description": "sludges containing hazardous substances from other treatment of industrial waste water"
},
{
    "code": "19 08 14",
    "description": "sludges from other treatment of industrial waste water other than those mentioned in 19 08 13"
},
{
    "code": "19 08 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "19 09 01",
    "description": "solid waste from primary filtration and screenings"
},
{
    "code": "19 09 02",
    "description": "sludges from water clarification"
},
{
    "code": "19 09 03",
    "description": "sludges from decarbonation"
},
{
    "code": "19 09 04",
    "description": "spent activated carbon"
},
{
    "code": "19 09 05",
    "description": "saturated or spent ion exchange resins"
},
{
    "code": "19 09 06",
    "description": "solutions and sludges from regeneration of ion exchangers"
},
{
    "code": "19 09 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "19 10 01",
    "description": "iron and steel waste"
},
{
    "code": "19 10 02",
    "description": "non-ferrous waste"
},
{
    "code": "19 10 03*",
    "description": "fluff-light fraction and dust containing hazardous substances"
},
{
    "code": "19 10 04",
    "description": "fluff-light fraction and dust other than those mentioned in 19 10 03"
},
{
    "code": "19 10 05*",
    "description": "other fractions containing hazardous substances"
},
{
    "code": "19 10 06",
    "description": "other fractions other than those mentioned in 19 10 05"
},
{
    "code": "19 11 01*",
    "description": "spent filter clays"
},
{
    "code": "19 11 02*",
    "description": "acid tars"
},
{
    "code": "19 11 03*",
    "description": "aqueous liquid wastes"
},
{
    "code": "19 11 04*",
    "description": "wastes from cleaning of fuel with bases"
},
{
    "code": "19 11 05*",
    "description": "sludges from on-site effluent treatment containing hazardous substances"
},
{
    "code": "19 11 06",
    "description": "sludges from on-site effluent treatment other than those mentioned in 19 11 05"
},
{
    "code": "19 11 07*",
    "description": "wastes from flue-gas cleaning"
},
{
    "code": "19 11 99",
    "description": "wastes not otherwise specified"
},
{
    "code": "19 12 01",
    "description": "paper and cardboard"
},
{
    "code": "19 12 02",
    "description": "ferrous metal"
},
{
    "code": "19 12 03",
    "description": "non-ferrous metal"
},
{
    "code": "19 12 04",
    "description": "plastic and rubber"
},
{
    "code": "19 12 05",
    "description": "glass"
},
{
    "code": "19 12 06*",
    "description": "wood containing hazardous substances"
},
{
    "code": "19 12 07",
    "description": "wood other than that mentioned in 19 12 06"
},
{
    "code": "19 12 08",
    "description": "textiles"
},
{
    "code": "19 12 09",
    "description": "minerals (for example sand, stones)"
},
{
    "code": "19 12 10",
    "description": "combustible waste (refuse derived fuel)"
},
{
    "code": "19 12 11*",
    "description": "other wastes (including mixtures of materials) from mechanical treatment of waste containing hazardous substances"
},
{
    "code": "19 12 12",
    "description": "other wastes (including mixtures of materials) from mechanical treatment of wastes other than those mentioned in 19 12 11"
},
{
    "code": "19 13 01*",
    "description": "solid wastes from soil remediation containing hazardous substances"
},
{
    "code": "19 13 02",
    "description": "solid wastes from soil remediation other than those mentioned in 19 13 01"
},
{
    "code": "19 13 03*",
    "description": "sludges from soil remediation containing hazardous substances"
},
{
    "code": "19 13 04",
    "description": "sludges from soil remediation other than those mentioned in 19 13 03"
},
{
    "code": "19 13 05*",
    "description": "sludges from groundwater remediation containing hazardous substances"
},
{
    "code": "19 13 06",
    "description": "sludges from groundwater remediation other than those mentioned in 19 13 05"
},
{
    "code": "19 13 07*",
    "description": "aqueous liquid wastes and aqueous concentrates from groundwater remediation containing hazardous substances"
},
{
    "code": "19 13 08",
    "description": "aqueous liquid wastes and aqueous concentrates from groundwater remediation other than those mentioned in 19 13 07"
},
{
    "code": "20 01 01",
    "description": "paper and cardboard"
},
{
    "code": "20 01 02",
    "description": "glass"
},
{
    "code": "20 01 08",
    "description": "biodegradable kitchen and canteen waste"
},
{
    "code": "20 01 10",
    "description": "clothes"
},
{
    "code": "20 01 11",
    "description": "textiles"
},
{
    "code": "20 01 13*",
    "description": "solvents"
},
{
    "code": "20 01 14*",
    "description": "acids"
},
{
    "code": "20 01 15*",
    "description": "alkalines"
},
{
    "code": "20 01 17*",
    "description": "photochemicals"
},
{
    "code": "20 01 19*",
    "description": "pesticides"
},
{
    "code": "20 01 21*",
    "description": "fluorescent tubes and other mercury-containing waste"
},
{
    "code": "20 01 23*",
    "description": "discarded equipment containing chlorofluorocarbons"
},
{
    "code": "20 01 25",
    "description": "edible oil and fat"
},
{
    "code": "20 01 26*",
    "description": "oil and fat other than those mentioned in 20 01 25"
},
{
    "code": "20 01 27*",
    "description": "paint, inks, adhesives and resins containing hazardous substances"
},
{
    "code": "20 01 28",
    "description": "paint, inks, adhesives and resins other than those mentioned in 20 01 27"
},
{
    "code": "20 01 29*",
    "description": "detergents containing hazardous substances"
},
{
    "code": "20 01 30",
    "description": "detergents other than those mentioned in 20 01 29"
},
{
    "code": "20 01 31*",
    "description": "cytotoxic and cytostatic medicines"
},
{
    "code": "20 01 32",
    "description": "medicines other than those mentioned in 20 01 31"
},
{
    "code": "20 01 33*",
    "description": "batteries and accumulators included in 16 06 01, 16 06 02 or 16 06 03 and unsorted batteries and accumulators containing these batteries"
},
{
    "code": "20 01 34",
    "description": "batteries and accumulators other than those mentioned in 20 01 33"
},
{
    "code": "20 01 35*",
    "description": "discarded electrical and electronic equipment other than those mentioned in 20 01 21 and 20 01 23 containing hazardous components"
},
{
    "code": "20 01 36",
    "description": "discarded electrical and electronic equipment other than those mentioned in 20 01 21, 20 01 23 and 20 01 35"
},
{
    "code": "20 01 37*",
    "description": "wood containing hazardous substances"
},
{
    "code": "20 01 38",
    "description": "wood other than that mentioned in 20 01 37"
},
{
    "code": "20 01 39",
    "description": "plastics"
},
{
    "code": "20 01 40",
    "description": "metals"
},
{
    "code": "20 01 41",
    "description": "wastes from chimney sweeping"
},
{
    "code": "20 01 99",
    "description": "other fractions not otherwise specified"
},
{
    "code": "20 02 01",
    "description": "biodegradable waste"
},
{
    "code": "20 02 02",
    "description": "soil and stones"
},
{
    "code": "20 02 03",
    "description": "other non-biodegradable wastes"
},
{
    "code": "20 03 01",
    "description": "mixed municipal waste"
},
{
    "code": "20 03 02",
    "description": "waste from markets"
},
{
    "code": "20 03 03",
    "description": "street-cleaning residues"
},
{
    "code": "20 03 04",
    "description": "septic tank sludge"
},
{
    "code": "20 03 06",
    "description": "waste from sewage cleaning"
},
{
    "code": "20 03 07",
    "description": "bulky waste"
},
{
    "code": "20 03 99",
    "description": "municipal wastes not otherwise specified"
}
]

module.exports = {
    getDescriptionForCode: getDescriptionForCode
}