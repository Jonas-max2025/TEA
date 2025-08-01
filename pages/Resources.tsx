import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Spinner from '../components/ui/Spinner';
import { explainConcept, generateVisualStory } from '../services/geminiService';
import { VisualStory } from '../types';
import { IconSparkles } from '../constants';

const Resources: React.FC = () => {
  const [concept, setConcept] = useState<string>('');
  const [explanation, setExplanation] = useState<string>('');
  const [isExplainLoading, setExplainLoading] = useState<boolean>(false);
  const [explainError, setExplainError] = useState<string>('');

  const [storyTopic, setStoryTopic] = useState<string>('');
  const [visualStory, setVisualStory] = useState<VisualStory | null>(null);
  const [isStoryLoading, setStoryLoading] = useState<boolean>(false);
  const [storyError, setStoryError] = useState<string>('');

  const handleExplain = async () => {
    if (!concept) return;
    setExplainLoading(true);
    setExplanation('');
    setExplainError('');
    try {
      const result = await explainConcept(concept);
      setExplanation(result);
    } catch (error) {
      console.error(error);
      setExplainError('Hubo un error al procesar la solicitud. Por favor, inténtalo de nuevo.');
    } finally {
      setExplainLoading(false);
    }
  };
  
  const handleGenerateStory = async () => {
    if (!storyTopic) return;
    setStoryLoading(true);
    setVisualStory(null);
    setStoryError('');
    try {
        const result = await generateVisualStory(storyTopic);
        setVisualStory(result);
    } catch (error) {
        console.error(error);
        setStoryError('Hubo un error al generar la historia. Por favor, inténtalo de nuevo.');
    } finally {
        setStoryLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Simplify Concepts */}
      <Card className="w-full">
        <div className="p-6">
          <div className="flex items-center">
            <IconSparkles className="h-8 w-8 text-teal-500 mr-3" />
            <div>
                <h3 className="text-xl font-bold text-slate-800">Simplificar Conceptos con IA</h3>
                <p className="text-sm text-slate-500">Pide a la IA que explique temas complejos de forma sencilla.</p>
            </div>
          </div>
          <div className="mt-4 space-y-4">
            <Input
              type="text"
              placeholder="Ej: ¿Qué es la ecolalia?"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleExplain()}
            />
            <Button onClick={handleExplain} isLoading={isExplainLoading} className="w-full">
              Explicar Concepto
            </Button>
          </div>
          
          <div className="mt-6 min-h-[10rem]">
            {isExplainLoading && <Spinner />}
            {explainError && <p className="text-red-600 text-center">{explainError}</p>}
            {explanation && (
              <div className="prose prose-slate max-w-none prose-sm">
                <p dangerouslySetInnerHTML={{ __html: explanation.replace(/\n/g, '<br />') }} />
              </div>
            )}
          </div>
        </div>
      </Card>
      
      {/* Create Visual Stories */}
      <Card className="w-full">
        <div className="p-6">
          <div className="flex items-center">
            <IconSparkles className="h-8 w-8 text-purple-500 mr-3" />
             <div>
                <h3 className="text-xl font-bold text-slate-800">Crear Historias Visuales</h3>
                <p className="text-sm text-slate-500">Genera una historia paso a paso para preparar a tu hijo/a para una situación.</p>
            </div>
          </div>
          <div className="mt-4 space-y-4">
            <Input
              type="text"
              placeholder="Ej: Ir al dentista por primera vez"
              value={storyTopic}
              onChange={(e) => setStoryTopic(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleGenerateStory()}
            />
            <Button onClick={handleGenerateStory} isLoading={isStoryLoading} className="w-full bg-purple-600 hover:bg-purple-700 focus:ring-purple-500">
              Generar Historia
            </Button>
          </div>
          <div className="mt-6 min-h-[10rem]">
            {isStoryLoading && <Spinner />}
            {storyError && <p className="text-red-600 text-center">{storyError}</p>}
            {visualStory && (
              <div>
                <h4 className="font-bold text-lg mb-3">{visualStory.title}</h4>
                <ol className="space-y-4">
                  {visualStory.steps.map(step => (
                    <li key={step.step_number} className="flex items-start p-3 bg-slate-50 rounded-lg">
                       <span className="flex items-center justify-center h-8 w-8 rounded-full bg-purple-200 text-purple-700 font-bold text-sm mr-4 flex-shrink-0">{step.step_number}</span>
                       <div>
                            <p className="text-slate-800">{step.description}</p>
                            <p className="text-xs text-purple-600 mt-1"><em>Idea para pictograma: {step.pictogram_idea}</em></p>
                       </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Resources;
