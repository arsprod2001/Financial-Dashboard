import React, { useState } from 'react';
import { FiDownload, FiFileText, FiFilter, FiRefreshCw, FiSearch, FiPrinter, FiMail, FiBarChart2, FiPieChart, FiTrendingUp } from 'react-icons/fi';

// Définition des types
interface ReportType {
  id: string;
  name: string;
  icon: JSX.Element;
}

interface Report {
  id: number;
  title: string;
  type: string;
  date: string;
  size: string;
  generatedBy: string;
}

interface ExportHistoryItem {
  id: number;
  report: string;
  format: string;
  date: string;
  user: string;
}

const ReportsAndExport = () => {
  const [reportType, setReportType] = useState<string>('financier');
  const [timePeriod, setTimePeriod] = useState<string>('mois');
  const [exportFormat, setExportFormat] = useState<string>('pdf');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedReports, setSelectedReports] = useState<number[]>([]);

  const reportTypes: ReportType[] = [
    { id: 'financier', name: 'Financier', icon: <FiBarChart2 /> },
    { id: 'ventes', name: 'Ventes', icon: <FiTrendingUp /> },
    { id: 'depenses', name: 'Dépenses', icon: <FiPieChart /> },
    { id: 'tresorerie', name: 'Trésorerie', icon: <FiFileText /> },
    { id: 'performance', name: 'Performance', icon: <FiTrendingUp /> }
  ];

  const reports: Report[] = [
    {
      id: 1,
      title: 'Bilan Financier Annuel',
      type: 'financier',
      date: '2023-12-31',
      size: '2.4 MB',
      generatedBy: 'Système Automatique'
    },
    {
      id: 2,
      title: 'Analyse des Ventes Trimestrielles',
      type: 'ventes',
      date: '2023-10-15',
      size: '1.2 MB',
      generatedBy: 'Marie Dupont'
    },
    {
      id: 3,
      title: 'Rapport des Dépenses Mensuelles',
      type: 'depenses',
      date: '2023-11-30',
      size: '0.8 MB',
      generatedBy: 'Système Automatique'
    },
    {
      id: 4,
      title: 'Projections de Trésorerie 2024',
      type: 'tresorerie',
      date: '2023-11-20',
      size: '1.5 MB',
      generatedBy: 'Jean Martin'
    },
    {
      id: 5,
      title: 'Performance des Produits',
      type: 'performance',
      date: '2023-11-25',
      size: '1.1 MB',
      generatedBy: 'Système Automatique'
    },
    {
      id: 6,
      title: 'Analyse des Coûts Opérationnels',
      type: 'depenses',
      date: '2023-09-30',
      size: '1.7 MB',
      generatedBy: 'Sophie Leroy'
    }
  ];

  const exportHistory: ExportHistoryItem[] = [
    { id: 1, report: 'Bilan Financier Annuel', format: 'PDF', date: '2023-11-15 14:30', user: 'admin@entreprise.com' },
    { id: 2, report: 'Analyse des Ventes Trimestrielles', format: 'Excel', date: '2023-11-10 11:22', user: 'marie.dupont@entreprise.com' },
    { id: 3, report: 'Projections de Trésorerie 2024', format: 'CSV', date: '2023-11-05 09:45', user: 'jean.martin@entreprise.com' },
    { id: 4, report: 'Performance des Produits', format: 'PDF', date: '2023-10-28 16:15', user: 'admin@entreprise.com' }
  ];

  const filteredReports = reports.filter(report => {
    const matchesType = reportType === 'all' || report.type === reportType;
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const toggleReportSelection = (id: number) => {
    if (selectedReports.includes(id)) {
      setSelectedReports(selectedReports.filter(reportId => reportId !== id));
    } else {
      setSelectedReports([...selectedReports, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedReports.length === filteredReports.length) {
      setSelectedReports([]);
    } else {
      setSelectedReports(filteredReports.map(report => report.id));
    }
  };

  const handleExport = () => {
    if (selectedReports.length === 0) {
      alert('Veuillez sélectionner au moins un rapport à exporter');
      return;
    }
    
    const selectedTitles = reports
      .filter(report => selectedReports.includes(report.id))
      .map(report => report.title)
      .join(', ');
    
    alert(`Exportation de ${selectedReports.length} rapport(s) (${selectedTitles}) au format ${exportFormat.toUpperCase()} en cours...`);
  };

  return (
    <div className="
      relative max-w-6xl mx-auto p-6 
      bg-gray-900/80 backdrop-blur-sm
      rounded-xl shadow-2xl
      border border-gray-800 hover:border-cyan-500/30
      transition-all duration-300
      neon-glow
    ">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="
            text-2xl font-bold 
            text-cyan-400 neon-text
            bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text
          ">
            RAPPORTS ET EXPORTATION
          </h2>
          <div className="mt-2 flex items-center text-cyan-400/80">
            <FiFileText className="mr-2" />
            <span>Générez, visualisez et exportez vos rapports financiers</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
          <button className="
            p-2 rounded-lg
            bg-gradient-to-r from-cyan-500/20 to-blue-500/20
            text-cyan-400
            border border-cyan-500/30
            hover:from-cyan-500/30 hover:to-blue-500/30
            transition-all
            flex items-center
          ">
            <FiRefreshCw className="mr-2" />
            Actualiser
          </button>
          
          <button className="
            p-2 rounded-lg
            bg-gradient-to-r from-green-500/20 to-emerald-500/20
            text-green-400
            border border-green-500/30
            hover:from-green-500/30 hover:to-emerald-500/30
            transition-all
            flex items-center
          "
          onClick={handleExport}
          >
            <FiDownload className="mr-2" />
            Exporter sélection
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800/40 rounded-xl border border-cyan-500/30 p-5">
          <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center">
            <FiFilter className="mr-2" /> Type de rapport
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {reportTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setReportType(type.id)}
                className={`
                  p-3 rounded-lg flex flex-col items-center justify-center
                  transition-all border
                  ${
                    reportType === type.id
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/50'
                      : 'bg-gray-800/40 text-cyan-400/60 border-cyan-500/20 hover:bg-cyan-500/10'
                  }
                `}
              >
                <span className="text-xl mb-1">{type.icon}</span>
                <span>{type.name}</span>
              </button>
            ))}
            <button
              onClick={() => setReportType('all')}
              className={`
                p-3 rounded-lg flex flex-col items-center justify-center
                transition-all border
                ${
                  reportType === 'all'
                    ? 'bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 text-purple-400 border-purple-500/50'
                    : 'bg-gray-800/40 text-purple-400/60 border-purple-500/20 hover:bg-purple-500/10'
                }
              `}
            >
              <span className="text-xl mb-1"><FiFileText /></span>
              <span>Tous les rapports</span>
            </button>
          </div>
        </div>
        
        <div className="bg-gray-800/40 rounded-xl border border-purple-500/30 p-5">
          <h3 className="text-lg font-bold text-purple-400 mb-4">Période</h3>
          <div className="space-y-3">
            {['jour', 'semaine', 'mois', 'trimestre', 'année'].map(period => (
              <button
                key={period}
                onClick={() => setTimePeriod(period)}
                className={`
                  w-full px-4 py-2 rounded-lg
                  transition-all
                  border
                  ${
                    timePeriod === period
                      ? 'bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 text-purple-400 border-purple-500/50'
                      : 'bg-gray-800/40 text-purple-400/60 border-purple-500/20 hover:bg-purple-500/10'
                  }
                `}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-800/40 rounded-xl border border-green-500/30 p-5">
          <h3 className="text-lg font-bold text-green-400 mb-4">{"Options d'exportation"}</h3>
          
          <div className="mb-4">
            <label className="block text-cyan-400/80 mb-2">{"Format d'export"}</label>
            <div className="grid grid-cols-3 gap-2">
              {['pdf', 'excel', 'csv'].map(format => (
                <button
                  key={format}
                  onClick={() => setExportFormat(format)}
                  className={`
                    p-2 rounded-lg
                    transition-all
                    border
                    ${
                      exportFormat === format
                        ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/50'
                        : 'bg-gray-800/40 text-green-400/60 border-green-500/20 hover:bg-green-500/10'
                    }
                  `}
                >
                  {format.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-cyan-400/80 mb-2">Action supplémentaire</label>
            <div className="grid grid-cols-2 gap-2">
              <button className="
                p-2 rounded-lg
                bg-gradient-to-r from-cyan-500/20 to-blue-500/20
                text-cyan-400
                border border-cyan-500/30
                hover:from-cyan-500/30 hover:to-blue-500/30
                transition-all
                flex items-center justify-center
              ">
                <FiPrinter className="mr-2" />
                Imprimer
              </button>
              <button className="
                p-2 rounded-lg
                bg-gradient-to-r from-yellow-500/20 to-amber-500/20
                text-yellow-400
                border border-yellow-500/30
                hover:from-yellow-500/30 hover:to-amber-500/30
                transition-all
                flex items-center justify-center
              ">
                <FiMail className="mr-2" />
                Envoyer par mail
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-cyan-400/80 mb-2">Personnaliser</label>
            <button className="
              w-full p-2 rounded-lg
              bg-gradient-to-r from-pink-500/20 to-rose-500/20
              text-pink-400
              border border-pink-500/30
              hover:from-pink-500/30 hover:to-rose-500/30
              transition-all
            ">
              Créer un rapport personnalisé
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/40 rounded-xl border border-cyan-500/30 p-5 mb-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-cyan-400">
              <FiSearch />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un rapport..."
              className="
                w-full pl-10 pr-4 py-2
                bg-gray-900/50 border border-cyan-500/30
                text-cyan-400 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-cyan-500/50
              "
            />
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={toggleSelectAll}
              className="
                px-4 py-2 rounded-lg
                bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20
                text-purple-400
                border border-purple-500/30
                hover:from-purple-500/30 hover:to-fuchsia-500/30
                transition-all
              "
            >
              {selectedReports.length === filteredReports.length ? 'Tout désélectionner' : 'Tout sélectionner'}
            </button>
            <button className="
              px-4 py-2 rounded-lg
              bg-gradient-to-r from-red-500/20 to-rose-500/20
              text-red-400
              border border-red-500/30
              hover:from-red-500/30 hover:to-rose-500/30
              transition-all
            "
            onClick={() => setSelectedReports([])}
            >
              Effacer la sélection
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/40 rounded-xl border border-purple-500/30 p-5 mb-8">
        <h3 className="text-lg font-bold text-purple-400 mb-4">Rapports disponibles</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cyan-500/30">
                <th className="text-left py-3 px-4 text-cyan-400">
                  <input
                    type="checkbox"
                    checked={selectedReports.length === filteredReports.length && filteredReports.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded text-cyan-500"
                  />
                </th>
                <th className="text-left py-3 px-4 text-cyan-400">Titre</th>
                <th className="text-left py-3 px-4 text-cyan-400">Type</th>
                <th className="text-left py-3 px-4 text-cyan-400">Date</th>
                <th className="text-left py-3 px-4 text-cyan-400">Taille</th>
                <th className="text-left py-3 px-4 text-cyan-400">Généré par</th>
                <th className="text-left py-3 px-4 text-cyan-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr 
                  key={report.id} 
                  className="border-b border-gray-700/50 hover:bg-gray-700/30"
                >
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedReports.includes(report.id)}
                      onChange={() => toggleReportSelection(report.id)}
                      className="rounded text-cyan-500"
                    />
                  </td>
                  <td className="py-3 px-4 text-cyan-300">{report.title}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs">
                      {reportTypes.find(t => t.id === report.type)?.name}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-cyan-400/80">{report.date}</td>
                  <td className="py-3 px-4 text-cyan-400/80">{report.size}</td>
                  <td className="py-3 px-4 text-cyan-400/80">{report.generatedBy}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="p-1.5 rounded-md bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors">
                        <FiFileText />
                      </button>
                      <button className="p-1.5 rounded-md bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors">
                        <FiDownload />
                      </button>
                      <button className="p-1.5 rounded-md bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 transition-colors">
                        <FiPrinter />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredReports.length === 0 && (
          <div className="text-center py-8 text-cyan-400/60">
            Aucun rapport trouvé avec les filtres sélectionnés
          </div>
        )}
      </div>

      <div className="bg-gray-800/40 rounded-xl border border-green-500/30 p-5">
        <h3 className="text-lg font-bold text-green-400 mb-4">Historique des exports</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cyan-500/30">
                <th className="text-left py-3 px-4 text-cyan-400">Rapport</th>
                <th className="text-left py-3 px-4 text-cyan-400">Format</th>
                <th className="text-left py-3 px-4 text-cyan-400">{"Date d'export"}</th>
                <th className="text-left py-3 px-4 text-cyan-400">Utilisateur</th>
                <th className="text-left py-3 px-4 text-cyan-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {exportHistory.map((item) => (
                <tr 
                  key={item.id} 
                  className="border-b border-gray-700/50 hover:bg-gray-700/30"
                >
                  <td className="py-3 px-4 text-cyan-300">{item.report}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.format === 'PDF' ? 'bg-red-500/10 text-red-400' :
                      item.format === 'Excel' ? 'bg-green-500/10 text-green-400' :
                      'bg-blue-500/10 text-blue-400'
                    }`}>
                      {item.format}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-cyan-400/80">{item.date}</td>
                  <td className="py-3 px-4 text-cyan-400/80">{item.user}</td>
                  <td className="py-3 px-4">
                    <button className="p-1.5 rounded-md bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors">
                      <FiDownload />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 bg-gray-800/40 rounded-xl border border-yellow-500/30 p-6">
        <h3 className="text-lg font-bold text-yellow-400 mb-4">Prévisualisation du rapport</h3>
        <div className="h-96 bg-gray-900/50 rounded-lg border border-cyan-500/20 flex flex-col items-center justify-center">
          <FiFileText className="text-cyan-400/30 text-6xl mb-4" />
          <p className="text-cyan-400/60 text-center">
            Sélectionnez un rapport pour afficher la prévisualisation
          </p>
          <p className="text-cyan-400/40 text-sm mt-2">
            Formats supportés: PDF, Excel, CSV
          </p>
        </div>
      </div>

      <div className="
        absolute inset-0 rounded-xl 
        bg-gradient-to-br from-cyan-500/10 to-blue-500/10 
        opacity-0 hover:opacity-30
        transition-opacity pointer-events-none
      "/>
    </div>
  );
};

export default ReportsAndExport;