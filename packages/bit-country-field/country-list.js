const countryList = [
  {
    i: 'AF',
    lbl: 'Afghanistan',
    val: 'Afghanistan',
    img: 'countries/af.png',
    disabled: true,
  },
  {
    i: 'AL',
    lbl: 'Albania',
    val: 'Albania',
    img: 'countries/al.png',
    disabled: true,
  },
  {
    i: 'DZ',
    lbl: 'Algeria',
    val: 'Algeria',
    img: 'countries/dz.png',
  },
  {
    i: 'AS',
    lbl: 'American Samoa',
    val: 'American Samoa',
    img: 'countries/as.png',
  },
  {
    i: 'AD',
    lbl: 'Andorra',
    val: 'Andorra',
    img: 'countries/ad.png',
  },
  {
    i: 'AO',
    lbl: 'Angola',
    val: 'Angola',
    img: 'countries/ao.png',
  },
  {
    i: 'AI',
    lbl: 'Anguilla',
    val: 'Anguilla',
    img: 'countries/ai.png',
  },
  {
    i: 'AQ',
    lbl: 'Antarctica',
    val: 'Antarctica',
    img: 'countries/aq.png',
  },
  {
    i: 'AG',
    lbl: 'Antigua and Barbuda',
    val: 'Antigua and Barbuda',
    img: 'countries/ag.png',
  },
  {
    i: 'AR',
    lbl: 'Argentina',
    val: 'Argentina',
    img: 'countries/ar.png',
    disabled: true,
  },
  {
    i: 'AM',
    lbl: 'Armenia',
    val: 'Armenia',
    img: 'countries/am.png',
    disabled: true,
  },
  {
    i: 'AW',
    lbl: 'Aruba',
    val: 'Aruba',
    img: 'countries/aw.png',
  },
  {
    i: 'AU',
    lbl: 'Australia',
    val: 'Australia',
    img: 'countries/au.png',
  },
  {
    i: 'AT',
    lbl: 'Austria',
    val: 'Austria',
    img: 'countries/at.png',
    disabled: true,
  },
  {
    i: 'AZ',
    lbl: 'Azerbaijan',
    val: 'Azerbaijan',
    img: 'countries/az.png',
    disabled: true,
  },
  {
    i: 'BS',
    lbl: 'Bahamas (the)',
    val: 'Bahamas (the)',
    img: 'countries/bs.png',
    disabled: true,
  },
  {
    i: 'BH',
    lbl: 'Bahrain',
    val: 'Bahrain',
    img: 'countries/bh.png',
  },
  {
    i: 'BD',
    lbl: 'Bangladesh',
    val: 'Bangladesh',
    img: 'countries/bd.png',
  },
  {
    i: 'BB',
    lbl: 'Barbados',
    val: 'Barbados',
    img: 'countries/bb.png',
  },
  {
    i: 'BY',
    lbl: 'Belarus',
    val: 'Belarus',
    img: 'countries/by.png',
  },
  {
    i: 'BE',
    lbl: 'Belgium',
    val: 'Belgium',
    img: 'countries/be.png',
  },
  {
    i: 'BZ',
    lbl: 'Belize',
    val: 'Belize',
    img: 'countries/bz.png',
  },
  {
    i: 'BJ',
    lbl: 'Benin',
    val: 'Benin',
    img: 'countries/bj.png',
  },
  {
    i: 'BM',
    lbl: 'Bermuda',
    val: 'Bermuda',
    img: 'countries/bm.png',
  },
  {
    i: 'BT',
    lbl: 'Bhutan',
    val: 'Bhutan',
    img: 'countries/bt.png',
  },
  {
    i: 'BO',
    lbl: 'Bolivia (Plurinational State of)',
    val: 'Bolivia (Plurinational State of)',
    img: 'countries/bo.png',
  },
  {
    i: 'BQ',
    lbl: 'Bonaire, Sint Eustatius and Saba',
    val: 'Bonaire, Sint Eustatius and Saba',
    img: 'countries/bq.png',
  },
  {
    i: 'BA',
    lbl: 'Bosnia and Herzegovina',
    val: 'Bosnia and Herzegovina',
    img: 'countries/ba.png',
  },
  {
    i: 'BW',
    lbl: 'Botswana',
    val: 'Botswana',
    img: 'countries/bw.png',
  },
  {
    i: 'BV',
    lbl: 'Bouvet Island',
    val: 'Bouvet Island',
    img: 'countries/bv.png',
  },
  {
    i: 'BR',
    lbl: 'Brazil',
    val: 'Brazil',
    img: 'countries/br.png',
  },
  {
    i: 'IO',
    lbl: 'British Indian Ocean Territory (the)',
    val: 'British Indian Ocean Territory (the)',
    img: 'countries/io.png',
  },
  {
    i: 'BN',
    lbl: 'Brunei Darussalam',
    val: 'Brunei Darussalam',
    img: 'countries/bn.png',
  },
  {
    i: 'BG',
    lbl: 'Bulgaria',
    val: 'Bulgaria',
    img: 'countries/bg.png',
  },
  {
    i: 'BF',
    lbl: 'Burkina Faso',
    val: 'Burkina Faso',
    img: 'countries/bf.png',
  },
  {
    i: 'BI',
    lbl: 'Burundi',
    val: 'Burundi',
    img: 'countries/bi.png',
  },
  {
    i: 'CV',
    lbl: 'Cabo Verde',
    val: 'Cabo Verde',
    img: 'countries/cv.png',
  },
  {
    i: 'KH',
    lbl: 'Cambodia',
    val: 'Cambodia',
    img: 'countries/kh.png',
  },
  {
    i: 'CM',
    lbl: 'Cameroon',
    val: 'Cameroon',
    img: 'countries/cm.png',
  },
  {
    i: 'CA',
    lbl: 'Canada',
    val: 'Canada',
    img: 'countries/ca.png',
  },
  {
    i: 'KY',
    lbl: 'Cayman Islands (the)',
    val: 'Cayman Islands (the)',
    img: 'countries/ky.png',
  },
  {
    i: 'CF',
    lbl: 'Central African Republic (the)',
    val: 'Central African Republic (the)',
    img: 'countries/cf.png',
  },
  {
    i: 'TD',
    lbl: 'Chad',
    val: 'Chad',
    img: 'countries/td.png',
  },
  {
    i: 'CL',
    lbl: 'Chile',
    val: 'Chile',
    img: 'countries/cl.png',
  },
  {
    i: 'CN',
    lbl: 'China',
    val: 'China',
    img: 'countries/cn.png',
  },
  {
    i: 'CX',
    lbl: 'Christmas Island',
    val: 'Christmas Island',
    img: 'countries/cx.png',
  },
  {
    i: 'CC',
    lbl: 'Cocos (Keeling) Islands (the)',
    val: 'Cocos (Keeling) Islands (the)',
    img: 'countries/cc.png',
  },
  {
    i: 'CO',
    lbl: 'Colombia',
    val: 'Colombia',
    img: 'countries/co.png',
  },
  {
    i: 'KM',
    lbl: 'Comoros (the)',
    val: 'Comoros (the)',
    img: 'countries/km.png',
  },
  {
    i: 'CD',
    lbl: 'Congo (the Democratic Republic of the)',
    val: 'Congo (the Democratic Republic of the)',
    img: 'countries/cd.png',
  },
  {
    i: 'CG',
    lbl: 'Congo (the)',
    val: 'Congo (the)',
    img: 'countries/cg.png',
  },
  {
    i: 'CK',
    lbl: 'Cook Islands (the)',
    val: 'Cook Islands (the)',
    img: 'countries/ck.png',
  },
  {
    i: 'CR',
    lbl: 'Costa Rica',
    val: 'Costa Rica',
    img: 'countries/cr.png',
  },
  {
    i: 'HR',
    lbl: 'Croatia',
    val: 'Croatia',
    img: 'countries/hr.png',
  },
  {
    i: 'CU',
    lbl: 'Cuba',
    val: 'Cuba',
    img: 'countries/cu.png',
  },
  {
    i: 'CW',
    lbl: 'Curaçao',
    val: 'Curaçao',
    img: 'countries/cw.png',
  },
  {
    i: 'CY',
    lbl: 'Cyprus',
    val: 'Cyprus',
    img: 'countries/cy.png',
  },
  {
    i: 'CZ',
    lbl: 'Czechia',
    val: 'Czechia',
    img: 'countries/cz.png',
  },
  {
    i: 'CI',
    lbl: "Côte d'Ivoire",
    val: "Côte d'Ivoire",
    img: 'countries/ci.png',
  },
  {
    i: 'DK',
    lbl: 'Denmark',
    val: 'Denmark',
    img: 'countries/dk.png',
  },
  {
    i: 'DJ',
    lbl: 'Djibouti',
    val: 'Djibouti',
    img: 'countries/dj.png',
  },
  {
    i: 'DM',
    lbl: 'Dominica',
    val: 'Dominica',
    img: 'countries/dm.png',
  },
  {
    i: 'DO',
    lbl: 'Dominican Republic (the)',
    val: 'Dominican Republic (the)',
    img: 'countries/do.png',
  },
  {
    i: 'EU',
    lbl: 'Drapeau européen',
    val: 'Drapeau européen',
    img: 'countries/eu.png',
  },
  {
    i: 'EC',
    lbl: 'Ecuador',
    val: 'Ecuador',
    img: 'countries/ec.png',
  },
  {
    i: 'EG',
    lbl: 'Egypt',
    val: 'Egypt',
    img: 'countries/eg.png',
  },
  {
    i: 'GB-ENG',
    lbl: 'England',
    val: 'England',
    img: 'countries/gb-eng.png',
  },
  {
    i: 'SV',
    lbl: 'El Salvador',
    val: 'El Salvador',
    img: 'countries/sv.png',
  },
  {
    i: 'GQ',
    lbl: 'Equatorial Guinea',
    val: 'Equatorial Guinea',
    img: 'countries/gq.png',
  },
  {
    i: 'ER',
    lbl: 'Eritrea',
    val: 'Eritrea',
    img: 'countries/er.png',
  },
  {
    i: 'EE',
    lbl: 'Estonia',
    val: 'Estonia',
    img: 'countries/ee.png',
  },
  {
    i: 'SZ',
    lbl: 'Eswatini',
    val: 'Eswatini',
    img: 'countries/sz.png',
  },
  {
    i: 'ET',
    lbl: 'Ethiopia',
    val: 'Ethiopia',
    img: 'countries/et.png',
  },
  {
    i: 'FK',
    lbl: 'Falkland Islands (the) [Malvinas]',
    val: 'Falkland Islands (the) [Malvinas]',
    img: 'countries/fk.png',
  },
  {
    i: 'FO',
    lbl: 'Faroe Islands (the)',
    val: 'Faroe Islands (the)',
    img: 'countries/fo.png',
  },
  {
    i: 'FJ',
    lbl: 'Fiji',
    val: 'Fiji',
    img: 'countries/fj.png',
  },
  {
    i: 'FI',
    lbl: 'Finland',
    val: 'Finland',
    img: 'countries/fi.png',
  },
  {
    i: 'FR',
    lbl: 'France',
    val: 'France',
    img: 'countries/fr.png',
  },
  {
    i: 'GF',
    lbl: 'French Guiana',
    val: 'French Guiana',
    img: 'countries/gf.png',
  },
  {
    i: 'PF',
    lbl: 'French Polynesia',
    val: 'French Polynesia',
    img: 'countries/pf.png',
  },
  {
    i: 'TF',
    lbl: 'French Southern Territories (the)',
    val: 'French Southern Territories (the)',
    img: 'countries/tf.png',
  },
  {
    i: 'GA',
    lbl: 'Gabon',
    val: 'Gabon',
    img: 'countries/ga.png',
  },
  {
    i: 'GM',
    lbl: 'Gambia (the)',
    val: 'Gambia (the)',
    img: 'countries/gm.png',
  },
  {
    i: 'GE',
    lbl: 'Georgia',
    val: 'Georgia',
    img: 'countries/ge.png',
  },
  {
    i: 'DE',
    lbl: 'Germany',
    val: 'Germany',
    img: 'countries/de.png',
  },
  {
    i: 'GH',
    lbl: 'Ghana',
    val: 'Ghana',
    img: 'countries/gh.png',
  },
  {
    i: 'GI',
    lbl: 'Gibraltar',
    val: 'Gibraltar',
    img: 'countries/gi.png',
  },
  {
    i: 'GR',
    lbl: 'Greece',
    val: 'Greece',
    img: 'countries/gr.png',
  },
  {
    i: 'GL',
    lbl: 'Greenland',
    val: 'Greenland',
    img: 'countries/gl.png',
  },
  {
    i: 'GD',
    lbl: 'Grenada',
    val: 'Grenada',
    img: 'countries/gd.png',
  },
  {
    i: 'GP',
    lbl: 'Guadeloupe',
    val: 'Guadeloupe',
    img: 'countries/gp.png',
  },
  {
    i: 'GU',
    lbl: 'Guam',
    val: 'Guam',
    img: 'countries/gu.png',
  },
  {
    i: 'GT',
    lbl: 'Guatemala',
    val: 'Guatemala',
    img: 'countries/gt.png',
  },
  {
    i: 'GG',
    lbl: 'Guernsey',
    val: 'Guernsey',
    img: 'countries/gg.png',
  },
  {
    i: 'GN',
    lbl: 'Guinea',
    val: 'Guinea',
    img: 'countries/gn.png',
  },
  {
    i: 'GW',
    lbl: 'Guinea-Bissau',
    val: 'Guinea-Bissau',
    img: 'countries/gw.png',
  },
  {
    i: 'GY',
    lbl: 'Guyana',
    val: 'Guyana',
    img: 'countries/gy.png',
  },
  {
    i: 'HT',
    lbl: 'Haiti',
    val: 'Haiti',
    img: 'countries/ht.png',
  },
  {
    i: 'HM',
    lbl: 'Heard Island and McDonald Islands',
    val: 'Heard Island and McDonald Islands',
    img: 'countries/hm.png',
  },
  {
    i: 'VA',
    lbl: 'Holy See (the)',
    val: 'Holy See (the)',
    img: 'countries/va.png',
  },
  {
    i: 'HN',
    lbl: 'Honduras',
    val: 'Honduras',
    img: 'countries/hn.png',
  },
  {
    i: 'HK',
    lbl: 'Hong Kong',
    val: 'Hong Kong',
    img: 'countries/hk.png',
  },
  {
    i: 'HU',
    lbl: 'Hungary',
    val: 'Hungary',
    img: 'countries/hu.png',
  },
  {
    i: 'IS',
    lbl: 'Iceland',
    val: 'Iceland',
    img: 'countries/is.png',
  },
  {
    i: 'IN',
    lbl: 'India',
    val: 'India',
    img: 'countries/in.png',
  },
  {
    i: 'ID',
    lbl: 'Indonesia',
    val: 'Indonesia',
    img: 'countries/id.png',
  },
  {
    i: 'IR',
    lbl: 'Iran (Islamic Republic of)',
    val: 'Iran (Islamic Republic of)',
    img: 'countries/ir.png',
  },
  {
    i: 'IQ',
    lbl: 'Iraq',
    val: 'Iraq',
    img: 'countries/iq.png',
  },
  {
    i: 'IE',
    lbl: 'Ireland',
    val: 'Ireland',
    img: 'countries/ie.png',
  },
  {
    i: 'IM',
    lbl: 'Isle of Man',
    val: 'Isle of Man',
    img: 'countries/im.png',
  },
  {
    i: 'IL',
    lbl: 'Israel',
    val: 'Israel',
    img: 'countries/il.png',
  },
  {
    i: 'IT',
    lbl: 'Italy',
    val: 'Italy',
    img: 'countries/it.png',
  },
  {
    i: 'JM',
    lbl: 'Jamaica',
    val: 'Jamaica',
    img: 'countries/jm.png',
  },
  {
    i: 'JP',
    lbl: 'Japan',
    val: 'Japan',
    img: 'countries/jp.png',
  },
  {
    i: 'JE',
    lbl: 'Jersey',
    val: 'Jersey',
    img: 'countries/je.png',
  },
  {
    i: 'JO',
    lbl: 'Jordan',
    val: 'Jordan',
    img: 'countries/jo.png',
  },
  {
    i: 'KZ',
    lbl: 'Kazakhstan',
    val: 'Kazakhstan',
    img: 'countries/kz.png',
  },
  {
    i: 'KE',
    lbl: 'Kenya',
    val: 'Kenya',
    img: 'countries/ke.png',
  },
  {
    i: 'KI',
    lbl: 'Kiribati',
    val: 'Kiribati',
    img: 'countries/ki.png',
  },
  {
    i: 'KP',
    lbl: "Korea (the Democratic People's Republic of)",
    val: "Korea (the Democratic People's Republic of)",
    img: 'countries/kp.png',
  },
  {
    i: 'KR',
    lbl: 'Korea (the Republic of)',
    val: 'Korea (the Republic of)',
    img: 'countries/kr.png',
  },
  {
    i: 'KW',
    lbl: 'Kuwait',
    val: 'Kuwait',
    img: 'countries/kw.png',
  },
  {
    i: 'KG',
    lbl: 'Kyrgyzstan',
    val: 'Kyrgyzstan',
    img: 'countries/kg.png',
  },
  {
    i: 'LA',
    lbl: "Lao People's Democratic Republic (the)",
    val: "Lao People's Democratic Republic (the)",
    img: 'countries/la.png',
  },
  {
    i: 'LV',
    lbl: 'Latvia',
    val: 'Latvia',
    img: 'countries/lv.png',
  },
  {
    i: 'LB',
    lbl: 'Lebanon',
    val: 'Lebanon',
    img: 'countries/lb.png',
  },
  {
    i: 'LS',
    lbl: 'Lesotho',
    val: 'Lesotho',
    img: 'countries/ls.png',
  },
  {
    i: 'LR',
    lbl: 'Liberia',
    val: 'Liberia',
    img: 'countries/lr.png',
  },
  {
    i: 'LY',
    lbl: 'Libya',
    val: 'Libya',
    img: 'countries/ly.png',
  },
  {
    i: 'LI',
    lbl: 'Liechtenstein',
    val: 'Liechtenstein',
    img: 'countries/li.png',
  },
  {
    i: 'LT',
    lbl: 'Lithuania',
    val: 'Lithuania',
    img: 'countries/lt.png',
  },
  {
    i: 'LU',
    lbl: 'Luxembourg',
    val: 'Luxembourg',
    img: 'countries/lu.png',
  },
  {
    i: 'MO',
    lbl: 'Macao',
    val: 'Macao',
    img: 'countries/mo.png',
  },
  {
    i: 'MG',
    lbl: 'Madagascar',
    val: 'Madagascar',
    img: 'countries/mg.png',
  },
  {
    i: 'MW',
    lbl: 'Malawi',
    val: 'Malawi',
    img: 'countries/mw.png',
  },
  {
    i: 'MY',
    lbl: 'Malaysia',
    val: 'Malaysia',
    img: 'countries/my.png',
  },
  {
    i: 'MV',
    lbl: 'Maldives',
    val: 'Maldives',
    img: 'countries/mv.png',
  },
  {
    i: 'ML',
    lbl: 'Mali',
    val: 'Mali',
    img: 'countries/ml.png',
  },
  {
    i: 'MT',
    lbl: 'Malta',
    val: 'Malta',
    img: 'countries/mt.png',
  },
  {
    i: 'MH',
    lbl: 'Marshall Islands (the)',
    val: 'Marshall Islands (the)',
    img: 'countries/mh.png',
  },
  {
    i: 'MQ',
    lbl: 'Martinique',
    val: 'Martinique',
    img: 'countries/mq.png',
  },
  {
    i: 'MR',
    lbl: 'Mauritania',
    val: 'Mauritania',
    img: 'countries/mr.png',
  },
  {
    i: 'MU',
    lbl: 'Mauritius',
    val: 'Mauritius',
    img: 'countries/mu.png',
  },
  {
    i: 'YT',
    lbl: 'Mayotte',
    val: 'Mayotte',
    img: 'countries/yt.png',
  },
  {
    i: 'MX',
    lbl: 'Mexico',
    val: 'Mexico',
    img: 'countries/mx.png',
  },
  {
    i: 'FM',
    lbl: 'Micronesia (Federated States of)',
    val: 'Micronesia (Federated States of)',
    img: 'countries/fm.png',
  },
  {
    i: 'MD',
    lbl: 'Moldova (the Republic of)',
    val: 'Moldova (the Republic of)',
    img: 'countries/md.png',
  },
  {
    i: 'MC',
    lbl: 'Monaco',
    val: 'Monaco',
    img: 'countries/mc.png',
  },
  {
    i: 'MN',
    lbl: 'Mongolia',
    val: 'Mongolia',
    img: 'countries/mn.png',
  },
  {
    i: 'ME',
    lbl: 'Montenegro',
    val: 'Montenegro',
    img: 'countries/me.png',
  },
  {
    i: 'MS',
    lbl: 'Montserrat',
    val: 'Montserrat',
    img: 'countries/ms.png',
  },
  {
    i: 'MA',
    lbl: 'Morocco',
    val: 'Morocco',
    img: 'countries/ma.png',
  },
  {
    i: 'MZ',
    lbl: 'Mozambique',
    val: 'Mozambique',
    img: 'countries/mz.png',
  },
  {
    i: 'MM',
    lbl: 'Myanmar',
    val: 'Myanmar',
    img: 'countries/mm.png',
  },
  {
    i: 'NA',
    lbl: 'Namibia',
    val: 'Namibia',
    img: 'countries/na.png',
  },
  {
    i: 'NR',
    lbl: 'Nauru',
    val: 'Nauru',
    img: 'countries/nr.png',
  },
  {
    i: 'NP',
    lbl: 'Nepal',
    val: 'Nepal',
    img: 'countries/np.png',
  },
  {
    i: 'NL',
    lbl: 'Netherlands (the)',
    val: 'Netherlands (the)',
    img: 'countries/nl.png',
  },
  {
    i: 'NC',
    lbl: 'New Caledonia',
    val: 'New Caledonia',
    img: 'countries/nc.png',
  },
  {
    i: 'NZ',
    lbl: 'New Zealand',
    val: 'New Zealand',
    img: 'countries/nz.png',
  },
  {
    i: 'NI',
    lbl: 'Nicaragua',
    val: 'Nicaragua',
    img: 'countries/ni.png',
  },
  {
    i: 'NE',
    lbl: 'Niger (the)',
    val: 'Niger (the)',
    img: 'countries/ne.png',
  },
  {
    i: 'NG',
    lbl: 'Nigeria',
    val: 'Nigeria',
    img: 'countries/ng.png',
  },
  {
    i: 'NU',
    lbl: 'Niue',
    val: 'Niue',
    img: 'countries/nu.png',
  },
  {
    i: 'NF',
    lbl: 'Norfolk Island',
    val: 'Norfolk Island',
    img: 'countries/nf.png',
  },
  {
    i: 'GB-NIR',
    lbl: 'Northern Ireland',
    val: 'Northern Ireland',
    img: 'countries/gb-nir.png',
  },
  {
    i: 'MP',
    lbl: 'Northern Mariana Islands (the)',
    val: 'Northern Mariana Islands (the)',
    img: 'countries/mp.png',
  },
  {
    i: 'NO',
    lbl: 'Norway',
    val: 'Norway',
    img: 'countries/no.png',
  },
  {
    i: 'OM',
    lbl: 'Oman',
    val: 'Oman',
    img: 'countries/om.png',
  },
  {
    i: 'PK',
    lbl: 'Pakistan',
    val: 'Pakistan',
    img: 'countries/pk.png',
  },
  {
    i: 'PW',
    lbl: 'Palau',
    val: 'Palau',
    img: 'countries/pw.png',
  },
  {
    i: 'PS',
    lbl: 'Palestine, State of',
    val: 'Palestine, State of',
    img: 'countries/ps.png',
  },
  {
    i: 'PA',
    lbl: 'Panama',
    val: 'Panama',
    img: 'countries/pa.png',
  },
  {
    i: 'PG',
    lbl: 'Papua New Guinea',
    val: 'Papua New Guinea',
    img: 'countries/pg.png',
  },
  {
    i: 'PY',
    lbl: 'Paraguay',
    val: 'Paraguay',
    img: 'countries/py.png',
  },
  {
    i: 'PE',
    lbl: 'Peru',
    val: 'Peru',
    img: 'countries/pe.png',
  },
  {
    i: 'PH',
    lbl: 'Philippines (the)',
    val: 'Philippines (the)',
    img: 'countries/ph.png',
  },
  {
    i: 'PN',
    lbl: 'Pitcairn',
    val: 'Pitcairn',
    img: 'countries/pn.png',
  },
  {
    i: 'PL',
    lbl: 'Poland',
    val: 'Poland',
    img: 'countries/pl.png',
  },
  {
    i: 'PT',
    lbl: 'Portugal',
    val: 'Portugal',
    img: 'countries/pt.png',
  },
  {
    i: 'PR',
    lbl: 'Puerto Rico',
    val: 'Puerto Rico',
    img: 'countries/pr.png',
  },
  {
    i: 'QA',
    lbl: 'Qatar',
    val: 'Qatar',
    img: 'countries/qa.png',
  },
  {
    i: 'MK',
    lbl: 'Republic of North Macedonia',
    val: 'Republic of North Macedonia',
    img: 'countries/mk.png',
  },
  {
    i: 'RO',
    lbl: 'Romania',
    val: 'Romania',
    img: 'countries/ro.png',
  },
  {
    i: 'RU',
    lbl: 'Russian Federation (the)',
    val: 'Russian Federation (the)',
    img: 'countries/ru.png',
  },
  {
    i: 'RW',
    lbl: 'Rwanda',
    val: 'Rwanda',
    img: 'countries/rw.png',
  },
  {
    i: 'RE',
    lbl: 'Réunion',
    val: 'Réunion',
    img: 'countries/re.png',
  },
  {
    i: 'BL',
    lbl: 'Saint Barthélemy',
    val: 'Saint Barthélemy',
    img: 'countries/bl.png',
  },
  {
    i: 'SH',
    lbl: 'Saint Helena, Ascension and Tristan da Cunha',
    val: 'Saint Helena, Ascension and Tristan da Cunha',
    img: 'countries/sh.png',
  },
  {
    i: 'KN',
    lbl: 'Saint Kitts and Nevis',
    val: 'Saint Kitts and Nevis',
    img: 'countries/kn.png',
  },
  {
    i: 'LC',
    lbl: 'Saint Lucia',
    val: 'Saint Lucia',
    img: 'countries/lc.png',
  },
  {
    i: 'MF',
    lbl: 'Saint Martin (French part)',
    val: 'Saint Martin (French part)',
    img: 'countries/mf.png',
  },
  {
    i: 'PM',
    lbl: 'Saint Pierre and Miquelon',
    val: 'Saint Pierre and Miquelon',
    img: 'countries/pm.png',
  },
  {
    i: 'VC',
    lbl: 'Saint Vincent and the Grenadines',
    val: 'Saint Vincent and the Grenadines',
    img: 'countries/vc.png',
  },
  {
    i: 'WS',
    lbl: 'Samoa',
    val: 'Samoa',
    img: 'countries/ws.png',
  },
  {
    i: 'SM',
    lbl: 'San Marino',
    val: 'San Marino',
    img: 'countries/sm.png',
  },
  {
    i: 'ST',
    lbl: 'Sao Tome and Principe',
    val: 'Sao Tome and Principe',
    img: 'countries/st.png',
  },
  {
    i: 'SA',
    lbl: 'Saudi Arabia',
    val: 'Saudi Arabia',
    img: 'countries/sa.png',
  },
  {
    i: 'GB-SCT',
    lbl: 'Scotland',
    val: 'Scotland',
    img: 'countries/gb-sct.png',
  },
  {
    i: 'SN',
    lbl: 'Senegal',
    val: 'Senegal',
    img: 'countries/sn.png',
  },
  {
    i: 'RS',
    lbl: 'Serbia',
    val: 'Serbia',
    img: 'countries/rs.png',
  },
  {
    i: 'SC',
    lbl: 'Seychelles',
    val: 'Seychelles',
    img: 'countries/sc.png',
  },
  {
    i: 'SL',
    lbl: 'Sierra Leone',
    val: 'Sierra Leone',
    img: 'countries/sl.png',
  },
  {
    i: 'SG',
    lbl: 'Singapore',
    val: 'Singapore',
    img: 'countries/sg.png',
  },
  {
    i: 'SX',
    lbl: 'Sint Maarten (Dutch part)',
    val: 'Sint Maarten (Dutch part)',
    img: 'countries/sx.png',
  },
  {
    i: 'SK',
    lbl: 'Slovakia',
    val: 'Slovakia',
    img: 'countries/sk.png',
  },
  {
    i: 'SI',
    lbl: 'Slovenia',
    val: 'Slovenia',
    img: 'countries/si.png',
  },
  {
    i: 'SB',
    lbl: 'Solomon Islands',
    val: 'Solomon Islands',
    img: 'countries/sb.png',
  },
  {
    i: 'SO',
    lbl: 'Somalia',
    val: 'Somalia',
    img: 'countries/so.png',
  },
  {
    i: 'ZA',
    lbl: 'South Africa',
    val: 'South Africa',
    img: 'countries/za.png',
  },
  {
    i: 'GS',
    lbl: 'South Georgia and the South Sandwich Islands',
    val: 'South Georgia and the South Sandwich Islands',
    img: 'countries/gs.png',
  },
  {
    i: 'SS',
    lbl: 'South Sudan',
    val: 'South Sudan',
    img: 'countries/ss.png',
  },
  {
    i: 'ES',
    lbl: 'Spain',
    val: 'Spain',
    img: 'countries/es.png',
  },
  {
    i: 'LK',
    lbl: 'Sri Lanka',
    val: 'Sri Lanka',
    img: 'countries/lk.png',
  },
  {
    i: 'SD',
    lbl: 'Sudan (the)',
    val: 'Sudan (the)',
    img: 'countries/sd.png',
  },
  {
    i: 'SR',
    lbl: 'Suriname',
    val: 'Suriname',
    img: 'countries/sr.png',
  },
  {
    i: 'SJ',
    lbl: 'Svalbard and Jan Mayen',
    val: 'Svalbard and Jan Mayen',
    img: 'countries/sj.png',
  },
  {
    i: 'SE',
    lbl: 'Sweden',
    val: 'Sweden',
    img: 'countries/se.png',
  },
  {
    i: 'CH',
    lbl: 'Switzerland',
    val: 'Switzerland',
    img: 'countries/ch.png',
  },
  {
    i: 'SY',
    lbl: 'Syrian Arab Republic',
    val: 'Syrian Arab Republic',
    img: 'countries/sy.png',
  },
  {
    i: 'TW',
    lbl: 'Taiwan (Province of China)',
    val: 'Taiwan (Province of China)',
    img: 'countries/tw.png',
  },
  {
    i: 'TJ',
    lbl: 'Tajikistan',
    val: 'Tajikistan',
    img: 'countries/tj.png',
  },
  {
    i: 'TZ',
    lbl: 'Tanzania, United Republic of',
    val: 'Tanzania, United Republic of',
    img: 'countries/tz.png',
  },
  {
    i: 'TH',
    lbl: 'Thailand',
    val: 'Thailand',
    img: 'countries/th.png',
  },
  {
    i: 'TL',
    lbl: 'Timor-Leste',
    val: 'Timor-Leste',
    img: 'countries/tl.png',
  },
  {
    i: 'TG',
    lbl: 'Togo',
    val: 'Togo',
    img: 'countries/tg.png',
  },
  {
    i: 'TK',
    lbl: 'Tokelau',
    val: 'Tokelau',
    img: 'countries/tk.png',
  },
  {
    i: 'TO',
    lbl: 'Tonga',
    val: 'Tonga',
    img: 'countries/to.png',
  },
  {
    i: 'TT',
    lbl: 'Trinidad and Tobago',
    val: 'Trinidad and Tobago',
    img: 'countries/tt.png',
  },
  {
    i: 'TN',
    lbl: 'Tunisia',
    val: 'Tunisia',
    img: 'countries/tn.png',
  },
  {
    i: 'TR',
    lbl: 'Turkey',
    val: 'Turkey',
    img: 'countries/tr.png',
  },
  {
    i: 'TM',
    lbl: 'Turkmenistan',
    val: 'Turkmenistan',
    img: 'countries/tm.png',
  },
  {
    i: 'TC',
    lbl: 'Turks and Caicos Islands (the)',
    val: 'Turks and Caicos Islands (the)',
    img: 'countries/tc.png',
  },
  {
    i: 'TV',
    lbl: 'Tuvalu',
    val: 'Tuvalu',
    img: 'countries/tv.png',
  },
  {
    i: 'UG',
    lbl: 'Uganda',
    val: 'Uganda',
    img: 'countries/ug.png',
  },
  {
    i: 'UA',
    lbl: 'Ukraine',
    val: 'Ukraine',
    img: 'countries/ua.png',
  },
  {
    i: 'AE',
    lbl: 'United Arab Emirates (the)',
    val: 'United Arab Emirates (the)',
    img: 'countries/ae.png',
  },
  {
    i: 'GB',
    lbl: 'United Kingdom',
    val: 'United Kingdom',
    img: 'countries/gb.png',
  },
  {
    i: 'UM',
    lbl: 'United States Minor Outlying Islands (the)',
    val: 'United States Minor Outlying Islands (the)',
    img: 'countries/um.png',
  },
  {
    i: 'US',
    lbl: 'United States of America (the)',
    val: 'United States of America (the)',
    img: 'countries/us.png',
  },
  {
    i: 'UY',
    lbl: 'Uruguay',
    val: 'Uruguay',
    img: 'countries/uy.png',
  },
  {
    i: 'UZ',
    lbl: 'Uzbekistan',
    val: 'Uzbekistan',
    img: 'countries/uz.png',
  },
  {
    i: 'VU',
    lbl: 'Vanuatu',
    val: 'Vanuatu',
    img: 'countries/vu.png',
  },
  {
    i: 'VE',
    lbl: 'Venezuela (Bolivarian Republic of)',
    val: 'Venezuela (Bolivarian Republic of)',
    img: 'countries/ve.png',
  },
  {
    i: 'VN',
    lbl: 'Viet Nam',
    val: 'Viet Nam',
    img: 'countries/vn.png',
  },
  {
    i: 'VG',
    lbl: 'Virgin Islands (British)',
    val: 'Virgin Islands (British)',
    img: 'countries/vg.png',
  },
  {
    i: 'VI',
    lbl: 'Virgin Islands (U.S.)',
    val: 'Virgin Islands (U.S.)',
    img: 'countries/vi.png',
  },
  {
    i: 'WF',
    lbl: 'Wallis and Futuna',
    val: 'Wallis and Futuna',
    img: 'countries/wf.png',
  },
  {
    i: 'GB-WLS',
    lbl: 'Wales',
    val: 'Wales',
    img: 'countries/gb-wls.png',
  },
  {
    i: 'EH',
    lbl: 'Western Sahara',
    val: 'Western Sahara',
    img: 'countries/eh.png',
  },
  {
    i: 'YE',
    lbl: 'Yemen',
    val: 'Yemen',
    img: 'countries/ye.png',
  },
  {
    i: 'ZM',
    lbl: 'Zambia',
    val: 'Zambia',
    img: 'countries/zm.png',
  },
  {
    i: 'ZW',
    lbl: 'Zimbabwe',
    val: 'Zimbabwe',
    img: 'countries/zw.png',
  },
  {
    i: 'AX',
    lbl: 'Åland Islands',
    val: 'Åland Islands',
    img: 'countries/ax.png',
  },
]

export default countryList
